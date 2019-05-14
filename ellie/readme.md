# Ellie, the bot

**Why Ellie?**

We named the bot Ellie for a simple reason. The bot is dealing with campaign finance, specifically with the 2020 presidential election in mind. "Ellie" felt like a pretty intuitive abbreviation for election.


**Why a bot?**

Not many people have the time to thoroughly peruse the fillngs on the FEC website. However, many people are interested in campaign finances – where candidate money is coming from, either from small money donors or political action committees, and what that says about the candidates themselves.

A bot is an expedient way for voters to educate themselves on issues of campaign finance, without having to query expansive, jargon-filled databases themselves. Ellie is outfitted to help both novices and experienced individuals when it comes to campaign finance, which can be a nebulous and dense topic.

Ellie also makes the exploration of 2020 candidates' campaign finance an interactive experience. The goal of the bot is to demystify campaign finance and make understanding 2020 money flow easier and (hopefully) a fun thing to do.

**FEC Data**

The Federal Election Commission (FEC) is the regulatory body that administers and polices federal campaign finance law. This makes the FEC the uniquely comprehensive dataset for understanding the money that flows in and out of campaigns, year after year, as well as the citizens and groups that fund different campaigns and causes. Small dollar donations are becoming an increasingly popular means of campaign fundraising, which makes the dataset all the more interesting to query.

* Process

    * To analyze the data, we checked the work done by other reporters.
    
    * Some of the code repos we used as documentation are:
    
        * 
    
    * Finally, we read the FEC API documentation. It was not a very comprehensive data source so we have to take advantage of its sandbox to understand how to deal with FEC data.
    
* Challenges
    * The FEC API documentation is extensive but hard to follow, with over 80 possible endpoints, each one consisting of similar phrasing with technical variations in the information they each pulled. We had to figure out the best endpoint to use for Ellie's purpose, eventually settling on the committee endpoint.
    * Despite FEC quarterly filings being due in mid-April and FEC employees assurance that all data would be processed and accessible via the API within 10 days of the filing deadline, some data is still not fetchable. For this reason, we've had to substitute some queries of 2020 data with queries of previous candidate elections; e.g., Bernie 2016. 



[Narrative Science](https://narrativescience.com/)


### Ellie the Bot


Looking for inspiration, we discovered the following bots that were really useful for our project:

* ProPublica's [Election DataBot](https://projects.propublica.org/electionbot/).
* The New York Times's [Campaign Finance Bot](https://github.com/newsdev/nyt-campfinbot).


These bots was very useful in designing our own.

### Data Sources

* OpenSecrets https://www.followthemoney.org/
* Top recipients https://www.opensecrets.org/political-action-committees-pacs/top-recipients
* 2020 Presidential race: https://www.opensecrets.org/2020-presidential-race

* Follow The Money https://www.followthemoney.org/

* FEC Search: https://www.fec.gov/data/search/

* FEC API: https://api.open.fec.gov/developers/



Also, during this process, we were able to experiment with other languages to build bots.

* First, we learned the basics of Rivescript. RiveScript is a simple scripting language for chatbots with a friendly, easy to learn syntax. It was a useful resource to develop a basic chatbot.

* Then, we moved to Rundexter. Rundexter is a platform that makes easier to run bots in different platforms. For the scope of the class, we designed 


Finally, we made some fireworks art in HTML and CSS to design the website that hosts the project.

TODOS:

* Make Ellie more chatty.
* Update her skills
