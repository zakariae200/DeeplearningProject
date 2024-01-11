import scrapy
from scrapy.spiders import CrawlSpider

class QuestionspiderSpider(scrapy.Spider):
    name = "questionspider"
    allowed_domains = ["almofiid.com"]
    start_urls = ["https://almofiid.com/%D8%A7%D8%B3%D8%A6%D9%84%D8%A9-%D8%AF%D9%8A%D9%86%D9%8A%D8%A9-%D8%A7%D8%B3%D9%84%D8%A7%D9%85%D9%8A%D8%A9-%D9%84%D9%84%D9%85%D8%B3%D8%A7%D8%A8%D9%82%D8%A7%D8%AA-%D9%88%D8%A7%D8%AC%D8%A7%D8%A8%D8%AA/"]

    def parse(self, response):
        items = response.css('li')
    
        with open('questions.csv', 'w', encoding='utf-8') as question_file, \
             open('answers.csv', 'w', encoding='utf-8') as answer_file:
    
            for item in items:
                question = item.xpath('strong[1]/following-sibling::text()').get()
                answer = item.xpath('strong[2]/following-sibling::text()').get()
    
                if question:
                    question_file.write(f'{question.strip()}\n')
    
                if answer:
                    answer_file.write(f'{answer.strip()}\n')
