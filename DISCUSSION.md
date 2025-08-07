Hello Alyssa and/or Matthew! My name is Taylor!

I created and updated the project in a series of pull requests and commits as follows all of which can be viewed from a top level from [here](https://github.com/thirdeyeclub/solace-engineering/commits/main/).

Inside the commits and PRs are comments on the details of the engineering decisions I made.

[The first bug I encountered was dotenv and esbuild-register/loader, I went for a better seed script using tsx instead](https://github.com/thirdeyeclub/solace-engineering/commit/111693654ab309c38d5969c9d03df9ae1ff88326)

PR #1
[The script for seeding was missing so I created it](https://github.com/thirdeyeclub/solace-engineering/pull/1)

PR #2
[Fixed several structural errors and a hydration issue.](https://github.com/thirdeyeclub/solace-engineering/pull/2)

[Removed dead code](https://github.com/thirdeyeclub/solace-engineering/commit/34355bf88e72ce1e6720faf998aedcdcbaa901c3)

Further thinking on this is that we could use this same advocateData for unit testing

PR #3 [I added a Tailwind plugin and created the UI + a few nice to have interactions on the rows](https://github.com/thirdeyeclub/solace-engineering/pull/3)

PR #4 [I created several optimizations on the backend for future scalability](https://github.com/thirdeyeclub/solace-engineering/pull/4)

-  Add indexes for quicker database selects
- Create a system of pagination
- Cache the query data for faster load times

PR #5 [I added the pagination UI for the frontend](https://github.com/thirdeyeclub/solace-engineering/pull/5)

What would I do if I had more time:

I would allow the columns of the table to be sortable.

I would have added a button on the phone numbers row cell to automatically connect a user to a dummy google phone so we could make a phone call automatically.

I would have made an extra filter above the table that sorts the table by the professionals specialty by automatically sorting the highest level of degree.

My final idea would be to create a new button at the end of the table row that would initiate a keywords search of the professionals name via a search engine to find articles/papers/news/complaints about the professional to allow the users to make more informed decisions before they call.
