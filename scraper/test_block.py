import pytest
from Block import Block

url_examples = {
  'public': 'https://twitter.com/jack/status/1247616214769086465',
  'private': 'https://twitter.com/seunomonije/status/1106770410874552320'
}

exceptions = {
  'private_exception': 'Retrieved tweet is not authorized to be viewed by the public\n'
}

def test_default_jack_tweet():
  url = url_examples.get('public')
  block = Block(url)
  assert str(block) == "{'block_title': 'jack', 'block_description': 'I’m moving $1B of my Square equity (~28% of my wealth) to #startsmall LLC to fund global COVID-19 relief. After we disarm this pandemic, the focus will shift to girl’s health and education, and UBI. It will operate transparently, all flows tracked here: https://t.co/hVkUczDQmz', 'block_image_url': None, 'block_url': 'https://twitter.com/jack/status/1247616214769086465'}"


def test_private_tweet(capsys):
  url = url_examples.get('private')
  block = Block(url)
  out, err = capsys.readouterr()
  assert out == exceptions.get('private_exception')