# Community Bonding Part II

With the community bonding period done, the actual coding phase has started. As mentioned in my previous blog post, in this post I will be talking about the experiments I have made, what I worked on in the second half of my community bonding period and what I will be doing for the next week.

I was geared up in understanding the basic pattern-based (Hearst patterns) approach yielding meaningful triples from the Knowledge Graph. Then Mariano asked me to look closely into the Tregex-based Triple Extraction method which instead of looking at the linear chain relationship of the dependency tree of the sentences, it tries to capture useful information from the syntactic parse trees. For understanding this, I explored some of the already existing open-source modules of the Tregex-based pattern approach.

# Tregex-based Pattern Approach:

In the first part of the last week of the community bonding period, I have spent a considerable amount of time in understanding the Tregex-based pattern-matching approach. I faced some difficulties in searching for a reasonable Tregex-based parser in python as the [Tregex approach by Stanford](https://nlp.stanford.edu/software/tregex.html) has been mostly implemented using Java. I have finally found a repository of [tregex-based pattern finding in python](https://github.com/szymonlopaciuk/dep_tregex_mod) in which I have finally made some modifications to yield a Tregex-based Triple Extraction framework. The implementation details are:

Mainly follows [this algorithm](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.453.4005&rep=rep1&type=pdf) : 
1. Intially divide the sentences into three main chunks based on POS: NP-VP-NP
	<subject, verb, object>

#### Subject Finding:

Firstly  we  intend  to  find  the  subject  of  the  sentence.  In  order  to  find  it,  we  are  going  to  search  in  the  NP  subtree.  The  subject  will  be  found  by  performing  breadth  first  search  and  selecting  the  first  descendent  of  NP  that  is  a  noun.

#### VERB Finding:

Secondly,  for  determining  the  predicate  of  the  sentence,  a  search  will  be  performed  in  the  VP  subtree.  The  deepest  verb  descendent  of  the  verb  phrase  will  give  the  second  element  of  the  triplet

#### OBJECT Finding:

Thirdly,  we  look  for  objects.  These  can  be  found  in  three  different subtrees, all siblings of the VP subtree containing the  predicate.  The  subtrees  are:  PP  (prepositional  phrase),  NP (noun phrase) and  ADJP  (adjective  phrase).  In  NP  and  PP  we  search  for the first noun, while in ADJP we find the first adjective

Moreover, for each of the element in the triplet, we also take a look into its modifiers, which mostly consists of adjectives (for nouns) and adverbs for the adjectives (for adjectives).

Finally came up with an implementation of the same using DBPedia abstracts, the code of which can be found [here](https://github.com/Ishani-Mondal/GSOC2020/tree/master/src) and the results can be obtained [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/triple_extraction_results/tregex_results.txt).


# ClauseIE-based Approach:

In the first part of the last week of the community bonding period, I have spent a considerable amount of time in understanding the OpenIE and ClauseIE based triple extraction methodology. I haved forked the python wrapper of the CLauseIE and implemented to extract triples , the code of which can be obtained [here](https://github.com/Ishani-Mondal/GSOC2020/tree/master/src) and results [here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/triple_extraction_results/ClauseIE_Results.txt).

# Mapping the Subject-Verb-Objects to DBpedia Classes and Resources:

For the purpose of mapping, I have used the DBpedia Spotlight API, the [mapped results are found here](https://github.com/Ishani-Mondal/GSOC2020/blob/master/triple_extraction_results/Mapped_ClauseIE_results.txt).

Thanks much for going through this !!





