# Necessary imports
from enum import Enum

# Things I wrote
from BlockInfo import BlockInfo
from hackernews.BlockFromHackerNewsLink import BlockFromHackerNewsLink
from twitter.BlockFromTwitterURL import BlockFromTwitterURL
from MetaFromArbitraryURL import MetaFromArbitraryURL


class Source(Enum):
  ANY = 1
  HACKER_NEWS = 2
  TWITTER = 3

class Block:
  # The tags need to be in order of 'block_title', 'block_description', 'block_image_url', 'block_url'
  possible_raw_json = {
    Source.ANY: [None, None, None, None],
    Source.HACKER_NEWS: ['title', None, None, 'url'],
    Source.TWITTER: ['name', 'text', None, None]
  }

  def __init__(self, url):
    block_type = self.__infer_block_type(url)
    self.data = self.create_block(block_type, url)

  def __repr__(self):
    return str(self.data)

  def create_block(self, block_type, url):
    if not block_type:
      block_info = BlockInfo(Source.ANY, url, None)
      result = self.__create_block_dict(block_info)
      return result

    if block_type == Source.HACKER_NEWS:
      json = BlockFromHackerNewsLink.get_json(url)
      block_info = BlockInfo(block_type, url, json)
      result = self.__create_block_dict(block_info)
      return result

    if block_type == Source.TWITTER:
      json = BlockFromTwitterURL.get_json(url)
      block_info = BlockInfo(block_type, url, json)
      result = self.__create_block_dict(block_info)
      return result

  def __create_block_dict(self, block_info):
    result_dict = {
      'block_title': None,
      'block_description': None,
      'block_image_url': None,
      'block_url': block_info.url,
    }

    # Figure out where we're getting data from
    source = block_info.source
    tags_we_want = Block.possible_raw_json.get(source)

    # Gather from any API calls first
    raw_json = block_info.json
    if raw_json:
      # Leaves unfilled tags as type none
      # This overwrites the block_url with anything from the API call
      for tag, key in zip(tags_we_want, result_dict.keys()):
        if tag:
          searchedVal = self.__get_value_from_json(raw_json, tag)
          # Note, searchedVal returns a generator object, and we're
          # just getting the first value every time, so could cause problems in the future
          # It works now tho since we're only expecting one value
          result_dict[key] = next(searchedVal)

    # Replaces any unfilled tags after checking API with retrieved tags from meta
    block_url = result_dict.get('block_url')
    meta = MetaFromArbitraryURL(block_url)
    meta_dict = dict(meta)
    for key1, key2 in zip(result_dict.keys(), meta_dict.keys()):
      if not result_dict[key1] and meta_dict[key2]:
        result_dict[key1] = meta_dict[key2]

    return result_dict

  # This will eventually get to the point where it should be it's own class
  def __infer_block_type(self, url):
    possible_types = {
      'news': Source.HACKER_NEWS,
      'twitter': Source.TWITTER,
    }

    # Make sure we're always starting at the same place
    if url[0:8] == 'https://':
      url = url[8:]
    elif url[0:7] == 'http://':
      url = url[7:]
    
    arr = url.split('.')
    return possible_types.get(arr[0])

  # Needed for the case that there's nested tags
  # Stops at the first occurence of the desired tag
  def __get_value_from_json(self, json, tag):
    for key, value in json.items():
      if isinstance(value, dict):
        yield from self.__get_value_from_json(value, tag)
      elif isinstance(value, list):
        for item in value:
          yield from self.__get_value_from_json(item, tag)
      elif key == tag:
        yield value
        
  def get_json(self):
    return self.data

