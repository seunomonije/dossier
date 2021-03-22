from lxml import html
from bs4 import BeautifulSoup as bs
import requests

class IdException(Exception):
  pass

class Block:
  def print_block(self):
    pass

class BlockFromTwitterLink(Block):
  """
  Determining whether or not its better to use the API or scrape ourselves...
  """
  pass


class BlockFromHackerNewsLink(Block):
  BASE_URL = "https://hacker-news.firebaseio.com/v0/"

  @staticmethod
  def get_json(url):
    try:
      url_id = BlockFromHackerNewsLink._get_id_from_url(url)
      json_data = BlockFromHackerNewsLink._get_json_from_id(url_id)
      return json_data
    except (IdException, Exception) as e:
      print('Something went wrong')
      print(e)
      exit(1) 

  @staticmethod
  def _get_id_from_url(url):
    # Splitting by question mark since we know the id is right after
    split_url = url.split('?')
    url_id = None
    for url_parameter in split_url[1:]:
      if url_parameter[0:3] == 'id=':
        url_id = url_parameter[3:]

    if url_id:
      return url_id
    else:
      raise IdException("Cannot get ID from HackerNews url")

  @staticmethod
  def _get_json_from_id(item_id):
    item_tag = 'item/'
    result_type = '.json'

    request_link = BlockFromHackerNewsLink.BASE_URL + item_tag + item_id + result_type
    response = requests.get(request_link)

    if response.status_code == 200:
      json_result = response.json()
      if not json_result:
        raise Exception("Type None JSON response from HackerNews id")
      return json_result
    else:
      raise Exception("Bad JSON response from HackerNews id")

class BlockFromArbitraryURL(Block):

  @staticmethod
  def get_title(url):
    page = requests.get(url)
    tree = html.fromstring(page.content)
    text = tree.findtext('.//title')
    print(text)


def main():
  url = input('Enter a HackerNews url: ')
  json = BlockFromHackerNewsLink.get_json(url)
  print(json)


if __name__ == '__main__':
  # TEST
  main()
