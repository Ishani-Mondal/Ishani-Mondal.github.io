# Improving the RDF Generated and validating its correctness

At the end of week 2, I have generated the RDF of the Obama Abstract. But I was using loosing out some of the most important triples which are possible to generate. This necessitated to include more information in the white list I have prepared. In addition to that, I have also made use of an external ontology consisting of the synonyms and hypernyms/hyponyms of words, which is termed as the [Wordnet](https://wordnet.princeton.edu/).

## Steps to improve the RDF Triple generation:

Step1 : Perform a dependency parse of the sentence
Step2 : Check the nounchunks of the sentence and take into account the information of the relations "attr" and "pobj".


```markdown
    Example: Obama worked as civil rights attorney.
```
In this example, attorney is the 'attr' of 'work', so we include this information for 
