rawText += `
===START_PAST

[img]http://www.legaltechdesign.com/visualawlibrary/wp-content/uploads/2014/12/Evidence-FLowchart-can-you-bring-in-past-statements-YOU-WANT-TO-BRING-IN-PAST-STATEMENTS.png[/img]

You want to bring in past statements
But can you?
Let's see...
Is it a past inconsistent statement?

+ Yes -> Inconsistent  $$ It is a past inconsistent statement.

+ No -> Consistent

$$ It is not a past inconsistent statement.


===Inconsistent

Are you bringing in to impeach?

+ Yes -> Inconsistent.Impeach $$ Attempting to impeach
+ No -> Inconsistent.NoImpeach $$ Not attempting to impeach


===Inconsistent.Impeach

Has the person you want to impeach testified?

+ Yes -> Inconsistent.Impeach.Testified $$ Person has testified
+ No -> DontDoIt $$ Person has not testified

===Inconsistent.Impeach.Testified

Do you have a good faith belief that this person made this statement?

+ Yes -> GoAhead $$ Yes to good faith
+ No -> DontDoIt $$ No good faith


===Inconsistent.NoImpeach

Are you bringing it in to prove something of substance?

+ Yes -> Inconsistent.NoImpeach.Subtance $$ Attempting to prove something of substance
+ No -> DontDoIt  $$ Not attempting to prove something of substance


===Inconsistent.NoImpeach.Subtance

Was the statement given under oath?

+ Yes -> Inconsistent.NoImpeach.Substance.Oath $$ Under oath
+ No -> DontDoIt $$ Not under oath


===Inconsistent.NoImpeach.Substance.Oath

Was the statement at a preceding or deposition?

+ Yes -> Inconsistent.NoImpeach.Substance.CX? $$ Statement at a preceding or deposition
+ No -> DontDoIt $$ Statement not at a preceding or deposition


===Inconsistent.NoImpeach.Substance.CX?

Did the Declarant testify & was subject to cross-examination?

+ Yes -> GoAhead $$ Declarant testifies & was subject to cross-examination
+ No -> DontDoIt  $$ Declarant did not testifies and/or was not subject to cross-examination

===Consistent

Is it a past consistent statement?

+ Yes ->  Consistent.Past $$ Past consistent statement
+ No -> Consistent.NotPast $$ Not aast consistent statement


===Consistent.Past

Is it being offered to rebut a charge of recent fabrication or improper motive?

+ Yes -> Consistent.Past.RebutRecent $$ Rebutting a charge of recent fabrication or improper motive
+ No -> DontDoIt $$ Not rebutting a charge of recent fabrication or improper motive

===Consistent.Past.RebutRecent

Does it meet the tome rule?

+ Yes -> Inconsistent.NoImpeach.Substance.CX? $$ Meets tome rule
+ No -> DontDoIt $$ Does not meet tome rule


===Consistent.NotPast

Is it a statement of identification?

+ Yes -> Consistent.NotPast.ID
+ No -> Consistent.NotPast.NoID

===Consistent.NotPast.ID

Does it identify a person?

+ Yes -> Consistent.NotPast.ID.Person $$ IDs a person
+ No -> DontDoIt $$ Does not ID a person


===Consistent.NotPast.ID.Person

Was it made after the the declarant perceived the statement?

+ Yes ->  Inconsistent.NoImpeach.Substance.CX? $$ Made after the the declarant perceived the statement
+ No -> DontDoIt $$ Wasn't made after the the declarant perceived the statement


===Consistent.NotPast.NoID

Is it past testimony?

+ Yes -> Consistent.NotPast.NoID.Past $$ Past testimony
+ No -> Consistent.NotPast.NoID.NotPast $$ Not past testimony


===Consistent.NotPast.NoID.Past

Is declarant unavailable to testify?

+ Yes -> Inconsistent.NoImpeach.Subtance $$ Declarant unavailable
+ No -> DontDoIt $$ Declarant available


===Consistent.NotPast.NoID.NotPast

Is it being used to refresh the witness testimony?

+ Yes -> Consistent.NotPast.NoID.NotPast.Available? $$ Refreshing the witness testimony
+ No -> Consistent.NotPast.NoID.NotPast.NotRefreshWitness $$ Not refreshing the witness testimony


===Consistent.NotPast.NoID.NotPast.Available?

Is the witness on stand?

+ Yes -> Consistent.NotPast.NoID.NotPast.RefreshWitness.OnStand $$ Witness on stand
+ No -> DontDoIt $$ Witness not on stand


===Consistent.NotPast.NoID.NotPast.RefreshWitness.OnStand

Is the witness memory exhausted?

+ Yes -> GoAhead $$ Witness memory exhausted
+ No -> DontDoIt $$ Witness memory not exhausted


===Consistent.NotPast.NoID.NotPast.NotRefreshWitness

Is it a past recorded recollection?

+ Yes -> Consistent.NotPast.NoID.NotPast.NotRefreshWitness.PastRecorded $$ Past recorded recollection?
+ No -> DontDoIt $$ Not a past recorded recollection


===Consistent.NotPast.NoID.NotPast.NotRefreshWitness.PastRecorded

Is it a record that was made when the witness memory was fresh?

+ Yes -> Consistent.NotPast.NoID.NotPast.NotRefreshWitness.PastRecorded.Fresh $$  Witness memory fresh
+ No -> DontDoIt $$ Witness memory not fresh


===Consistent.NotPast.NoID.NotPast.NotRefreshWitness.PastRecorded.Fresh

Does it reflect a witness knowledge correctly?

+ Yes -> Consistent.NotPast.NoID.NotPast.RefreshWitness.OnStand $$ Reflects witness knowledge correctly
+ No -> DontDoIt $$ Doesn't reflect witness knowledge correctly


===GoAhead

Go for is, sounds admissible!

+ Summary -> END $$ BRING IT IN!


===DontDoIt

Then no go, not admissible!

+ Summary -> END $$ NOT ADMISSIBLE!
`
