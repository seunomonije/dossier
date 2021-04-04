
from BlockInfo import BlockInfo
from hackernews.BlockFromHackerNewsLink import BlockFromHackerNewsLink
from MetaFromArbitraryURL import MetaFromArbitraryURL

class Block:
  # The tags need to be in order of 'block_title', 'block_description', 'block_image_url', 'block_url'
  possible_raw_json = {
    'Any': [None, None, None, None],
    'HN': ['title', None, None, 'url']
  }

  def __init__(self, block_type, url):
    self.data = self.create_block(block_type, url)

  def create_block(self, block_type, url):
    if not block_type:
      block_info = BlockInfo('Any', url, None)
      result = self.__create_block_dict(block_info)
      return result

    if block_type == 'HN':
      json = BlockFromHackerNewsLink.get_json(url)
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
          result_dict[key] = raw_json[tag]

    # Replaces any unfilled tags after checking API with retrieved tags from meta
    block_url = result_dict.get('block_url')
    meta = MetaFromArbitraryURL(block_url)
    meta_dict = dict(meta)
    for key1, key2 in zip(result_dict.keys(), meta_dict.keys()):
      if not result_dict[key1] and meta_dict[key2]:
        result_dict[key1] = meta_dict[key2]

    return result_dict

  def print_block(self):
    print(self.data)
