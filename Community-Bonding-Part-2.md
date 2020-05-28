With the community bonding period done, the actual coding phase has started. As mentioned in my previous blog post, in this post I will be talking about the experiments I have made, what I worked on in the second half of my community bonding period and what I will be doing for the next week.

I was geared up in understanding the basic pattern-based (Hearst patterns) approach yielding meaningful triples from the Knowledge Graph. Then Mariano asked me to look closely into the Tregex-based Triple Extraction method which instead of looking at the linear chain relationship of the dependency tree of the sentences, it tries to capture useful information from the syntactic parse trees. For understanding this, I explored some of the already existing open-source modules of the Tregex-based pattern approach.

### Tregex-based Pattern Approach:

In the first part of the last week of the community bonding period, I have spent a considerable amount of time in understanding the Tregex-based pattern-matching approach. I faced some difficulties in searching for a reasonable Tregex-based parser in python as the ![Tregex approach by Stanford](https://nlp.stanford.edu/software/tregex.html) has been mostly implemented using Java.

