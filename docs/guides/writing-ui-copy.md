# Writing the words

Every string a person reads is part of the interface: labels, placeholders, descriptions, buttons, titles, errors, empty states, confirmations. They get the same care as the code around them.

## The description line is where it goes wrong

A line under a field only exists if it says something the person **cannot** work out from the label.

| | |
| --- | --- |
| `Phone` + "Helps the shop reach you about an order" | cut it — everyone knows what a phone is for |
| `Password` + "At least 8 characters" | keep it — a rule nobody can guess, and it prevents a rejected submit |

When you are unsure whether to write the sentence, do not write it. Extra text costs a read on every visit; a missing line costs one question, once.

The same cut applies to anything that sounds institutional: a terms notice where there is already a checkbox, "click here to", "please", and an explanation of what the button beside it obviously does.

## Name the action on the button

"Delete project" beats "OK". Someone who skimmed the question can still tell what the button does — and on a confirmation dialog that is the whole point.

## Errors say what happened and what to do

A raw status code tells a person nothing. Say what did not happen, then the next step. Keep the technical detail in a secondary line they could repeat to support, not in the sentence they have to act on.

## An empty state without an action is an apology

`EmptyState` takes an `action` because that is the reason the component exists. "No orders yet" on its own tells someone they are in the right place and stuck. "No orders yet" with **New order** tells them what happens next.

## Sentence case, no trailing period on short strings

Labels, buttons and menu items are sentence case. A label, a button and a single-line description do not end in a period; a description of two or more sentences does.

## Say it the way you would out loud

Read the string back to yourself. If you would not say it to someone standing next to you, rewrite it. That is what catches "An error has occurred while processing your request", "Please be advised", and "Successfully completed".

Watch for the marks of writing that came from nowhere in particular: three items where two would do, a sentence that opens by restating the heading, praise for the feature inside the feature. Cut those on sight.

## Localisation

The interface is in English. Dates, numbers and currency go through [`lib/date.ts`](../lib/date.md) and [`utils/number.ts`](../utils/number.md), never through a hand-built format string — that is what keeps a locale change from being a search across every screen.
