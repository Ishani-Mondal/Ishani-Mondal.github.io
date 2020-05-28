## Introduction & Community Bonding Period - Part-1

The following blog is an account of the GSoC project taken by me under DBpedia. I would like to thank Mariano Rico for mentoring and who will be following me through this journey. A few details about this project :- The main idea of this project is use syntactic methods (syntax parsers) coupled with other linguistic based algorithms in order to help generate triples from information abstracts. DBpedia has created a large web graph using the following data which can be found on their website. We wish to provide a sort of automation to finding triples which can be added to this webgraph. The other details can be found in my proposal.

The firt phase of GSoC is the Community bonding period which extends till late May. In this phase, prelimnaries to that project are taken care of. Given I have reached the halfway point of this phase, I thought of talking about what all I have done and what I will work on in the near future.

### Task-1 Spotlight

The first prelimnary tasks include understanding DBpedia Spotlight. Spotlight is an annotating tool, which when given an abstract or a sentence can annotate words, given their presence in the DBpedia web graph or an instance of it is present. Understanding this would be important, given that this tool will be necessary for generating triples and mapping these words to the already existant forms present in the DBpedia web graph.

### Task-2 Familiarization with Dbpedia Classes and Ontologies:

Another warm-up task included having some hands-on experience in understanding several Ontology Classes and the properties in Dbpedia. My mentor gave a suitable example on the DBpedia Resource of [Donald Trump](http://dbpedia.org/page/Donald_Trump). For example: for the sentence “The president of the US told that covid19 disease is fake news”, we could get these triples:
      
```markdown
      
      - <http://dbpedia.org/page/Donald_Trump> <verb:say> <directObject_1>
      - <directObject_1> <owl:class> <dbpedia:Disease>
      - <covid19> <owl:class> <dbpedia:Disease>
      - <covid19> <rdf:is_a> <dbpedia:FakeNews>



<img src="images/emoticons/cool.png">



### Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/Ishani-Mondal/Ishani-Mondal.github.io/settings). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://help.github.com/categories/github-pages-basics/) or [contact support](https://github.com/contact) and we’ll help you sort it out.
