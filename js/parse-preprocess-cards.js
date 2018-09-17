/*
* Creates card objects and populates the main dictionary
* Parses text for any changes that only need to be done once
*/
function preprocessCards(rawText) {
  let cardBlocks = new BlockArray({'2card': null}, rawText);
  let cardList = [];
  for (let i = 0; i < (cardBlocks.array.length); i++) {
    if (!cardBlocks.array[i].tag === '2card') {
      continue;
    }
    let title = cardBlocks.array[i].properties.card;
    let content = cardBlocks.array[i].content.trim();
    if (!content) continue;
    let card = new Card(title, content);
    // let cardRaw = cardBlocks.array[i];
    // if (cardRaw.tag === '2card') {
    //   let card = new Card(cardRaw.properties.card, cardRaw.content);
    if (globalCardDict[title]) {
      console.log(`Error:  Card titled ${title} already exists`);
    } else {
      // this steps generates the properties list for certain HTML elements
      // if the block has an id property, it is stored in globalExcerpts
      globalCardDict[title] = card;
      cardList.push(card)
    }
  }
  for (let i in cardList) {
    cardList[i].replaceCopies();
  }
}

var bbCodeHTMLConversions = {
  '2ol': bbCodeHTMLConvertLists,
  '2ul': bbCodeHTMLConvertLists,
  '2img': bbCodeHTMLConvertIMG,
  '2url': bbCodeHTMLConvertURL,
  '2span': bbCodeHTMLSpan,
  '2div': bbCodeHTMLDiv,
  '1copy': bbCodeHTMLCopyExcerpt,
  '2ifelse': bbCodeHTMLConditional,
  '2if': bbCodeHTMLIfConditional,
  '2else': bbCodeHTMLElseConditional,
  '2button': bbCodeHTMLButton,
  '2js': bbCodeJSEval,
  '2prompt': bbCodeReturnContents,
  '2toggle': bbCodeReturnContents,
  '2reveal': bbCodeReturnContents,
  '1get': bbCodeGetTempVariable,
  '1set': bbCodeSetTempVariables,
  '1getcard': bbCodeGetCardVariable,
  '1setcard': bbCodeSetCardVariables,
  '1getglobal': bbCodeGetGlobalVariable,
  '1setglobal': bbCodeSetGlobalVariables,
};

// add dictionary keys to the global tag list so they can be converted to
// lower case in pre-processing
addToGlobalTagList(bbCodeHTMLConversions)

/*
* Parses bbCode into lists.  Lists are created with [ul][/ul] or [ol][/ol]
* List atoms are signified with [*], no closing tag
*/
function bbCodeHTMLConvertLists(block) {
  // TODO: this can break if the user forgets to input [*] at the beginning
  return `<${block.tag.substring(1)}>${block.getContents().trim().replaceAll('[*]',
    '</li><li>').substring(5)}</li></${block.tag.substring(1)}>`
}
/*
* Parses a link using the format [url:"http://site.com"]My website[/url]
* Other properties can also be specified
*/
function bbCodeHTMLConvertURL(block) {
  return `<a href="${removeQuotes(block.properties.url)}"
    target="blank">${block.getContents()}</a>`;
}
/*
* Inserts an image with [img]http://imageurl.com[/url].
* Other properties can also be specified
*/
function bbCodeHTMLConvertIMG(block) {
  return `<img ${block.getPropertiesOutput()}>"`;
}
/*
* Placeholder, which can be used to import a block from somewhere else.
* Use the ID of the other block as the property, [copy:"card title"]
}
*/
function bbCodeHTMLCopyExcerpt(block) {
  return `\nError: Could not find ${block.properties.cite}\n`;
}
/*
* Generates a span tag.  Can be combined with custom properties
*/
function bbCodeHTMLSpan(block) {
  return `<span ${block.getPropertiesOutput()}>${block.getContents()}</span>`;
}
/*
* Generates a DIV tag.  Can be combined with custom properties
*/
function bbCodeHTMLDiv(block) {
  return `<div ${block.getPropertiesOutput()}>${block.getContents()}</div>`;
}
/*
* Launches a conditional.  Formatted as [conditional][if="boolean"]do stuff[/if]
* [else="boolean"]do different stuff.[/else][else]I activate if nothing else
* does.[/else][conditional]
*/
function bbCodeHTMLConditional(block) {
  let ifStatementFound = false;
  for (let i = 0; i < block.blockArray.array.length; i++) {
    let subBlock = block.blockArray.array[i];
    if (!ifStatementFound && subBlock.tag === '2else') {
      return `You need to have an 'if' block before you can have an 'else' block: ${block.content}\n`;
    } else if (ifStatementFound && subBlock.tag === '2if') {
      return `You should not have multiple 'if' blocks in a single condition: ${block.content}\n`;
    } else if (subBlock.tag === '2if') {
      ifStatementFound = true;
      let result = subBlock.parseContents();
      if (result === false) {
        continue;
      }
      if (result.trim()) {
        return(result);
      }
      return '';
    } else if (subBlock.tag === '2else') {
      let result = subBlock.parseContents();
      if (result === false) {
        continue;
      }
      if (result.trim()) {
        return(result);
      }
      return '';
    }
  }
}

function bbCodeHTMLIfConditional(block) {
  let condition = false;
  if (block.properties.if) {
    try {
      eval(block.properties.if);
      eval(`condition = ${block.properties.if}`);
    } catch(err) {
      return err.message;
    }
    if (condition) {
      return block.getContents();
    }
  }
  return false;
}

function bbCodeHTMLElseConditional(block) {
  let condition = false;
  if (block.properties.else) {
    try {
      eval(block.properties.else);
      eval(`condition = ${block.properties.else}`);
    } catch(err) {
      return err.message;
    }
    if (condition) {
      return block.getContents();
    }
    return false;
  }
  return block.getContents();
}
/*
* Generates html for button
*/
function bbCodeHTMLButton(block) {
  if (!block.button) return '';
  return block.button.getHtml();
}
/*
* Runs JS code in the background.  The "return" keyword can also be used to return text
*/
function bbCodeJSEval(block) {
  try {
    eval(`(function () {${block.getContents()}})();`);
  } catch(err) {
    return err.message;
  }
  return '';
}


/*
* Getters for variable
*/
function genericGetVariable(str) {
  try {
    return eval(str);
  } catch(err) {
    return `${err.message}, problem loading ${str}`;
  }
}

function bbCodeGetTempVariable(block) {
  return genericGetVariable(`tempVar['${block.properties.get}']`);
}

function bbCodeGetCardVariable(block) {
  return genericGetVariable(`cardVar['${block.properties.get}']`);
}

function bbCodeGetGlobalVariable(block) {
  return genericGetVariable(`globalVar['${block.properties.get}']`);
}

function genericSetVariables(name, value, error) {
  try {
    eval(`${name} = ${value}`)
  } catch(err) {
    return error + `${err.message}, [${name} = ${value}]\n`;
  }
  return error;
}

/*
* Setters for variables
*/
function bbCodeSetTempVariables(block) {
  let error = '';
  for (let name in block.properties) {
    error = genericSetVariables(`tempVar['${name}']`, block.properties[name], error);
  }
  return error;
}

function bbCodeSetCardVariables(block) {
  let error = '';
  for (let name in block.properties) {
    error = genericSetVariables(`cardVar['${name}']`, block.properties[name], error);
  }
  return error;
}

function bbCodeSetGlobalVariables(block) {
  let error = '';
  for (let name in block.properties) {
    error = genericSetVariables(`globalVar['${name}']`, block.properties[name], error);
  }
  return error;
}

/*
* For tags that do nothing on their own
*/
function bbCodeReturnContents(block) {
  return block.getContents();
}