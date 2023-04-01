Latest changes:

Possibly breaking: Settings change
Should now be able to differentiate between two users sharing a browser
But it's possible settings may fail to migrate
Clear all settings should be more reliable
And all settings can now be exported for error reporting

Possibly breaking: Mutation observers
Some observers were spamming QoL changes an excessive number of times
I have made this more selective, but it's possible some change events may be missed?

New features: 
- Custom format multi-party page (issue 12)
- Sprite size toggle (issue 13)
- Show nature in move/release (issue 17)

Bug fixes:
- Search hidebox broken when no tooltips (issue 20)
- Egg group list in public/private field search (issue 21)
- Custom img search for eggs (issue 22)
