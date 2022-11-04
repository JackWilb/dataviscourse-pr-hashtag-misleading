Reviewers:
- DHRUVIL SHAH
- KUNAL MANJARE
- HARSH MAHAJAN
- ZHONGYI JIANG
- YONGFENG QIU


Feedback

> Have a gallery, showing all tweets

That's our gameplan. We're going to use the the oEmbed API to embed tweets directly from Twitter into the application. This is the best way forward, because it means we don't need to maintain any API code of our own. We can simply populate the page with tweets directly from Twitter. 

This gallery will also filter down as we filter using our other visualization elements, so we will be showing only the relevant tweets. We're also planning that this will be search-able using tweet id.

> Can you add a brush to select a timeframe

We hadn't considered having a time selector since the data is collected from discrete time periods. Adding a time selector might not be interesting, because it essentially select between 3 points in time. If the data were more continuously collected, we would consider this more deeply.

> Can we filter down to only one item? How about 0?

Is it possible that there's no data left after filtering down. This is not a bug and will be supported by the tool. If you select categories that don't overlap (probably after many categories have been selected), then we wouldn't want to show any data. We will likely add a message where the tweet gallery with a reason for why the user is not seeing any data.

> Do the tweets all have images?

Yes, all tweets that were collected have images. We don't anticipate any edge cases at the current time, but will address them as they come up during our implementation.

> Are there interactions or animations

Our currently planned interactions are showing a user which region they are hovering and allowing the user to click to filter. We hadn't thought about animations too deeply yet, but we plan to have some animation to reduce the abruptness of the data changing when a user filters. This will manifest as transitions when the tweet library is filtered, and possibly in upset as the data changes.
