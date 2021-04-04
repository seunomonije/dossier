from bs4 import BeautifulSoup
import requests

class MetaFromArbitraryURL(object):
  def __init__(self, url):
    self.soup = self.__make_soup(url)
    self.title = self.__get_title()
    self.description = self.__get_description()
    self.image_url = self.__get_image_url()
    self.url = url

  def __iter__(self):
    keys = list(self.__dict__.keys()) # inefficient
    keys_without_soup = keys[1:]
    for key in keys_without_soup:
      yield key, self.__dict__.get(key)

  def print_meta(self):
    print(f'Title: {self.title}')
    print(f'Description: {self.description}')
    print(f'Image url: {self.image_url}')
    print(f'Url: {self.url}')

  def __make_soup(self, url):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, features='lxml')
    return soup

  def __get_image_url(self):
    image = self.soup.find('meta', property='og:image')
    return image['content'] if image else None

  def __get_title(self):
    title = self.soup.find('meta', property='og:title')
    return title['content'] if title else None

  def __get_description(self):
    description = self.soup.find('meta', property='og:description')
    return description['content'] if description else None
    