import os
import requests
import json

class BlockFromTwitterURL:
  BASE_URL = 'https://api.twitter.com/2/tweets/'

  """
  Determining whether or not its better to use the API or scrape ourselves...
  """
  @staticmethod
  def get_json(url):
    try: 
      url_id = BlockFromTwitterURL.get_id_from_url(url)
      json_data = BlockFromTwitterURL.get_json_from_id(url_id)
      BlockFromTwitterURL.check_if_tweet_is_public(json_data)
      return json_data
    except Exception as e:
      print(e)
  
  @staticmethod
  def get_bearer_token():
    with open('twitter/secrets/bearer-token.txt', 'r') as file:
      return file.read()

  @staticmethod
  def get_id_from_url(url):
    split_url = url.split('/')
    return split_url[5]

  @staticmethod
  def get_json_from_id(tweet_id):
    bearer_token = BlockFromTwitterURL.get_bearer_token()
    headers = {'Authorization' : f'Bearer {bearer_token}'}

    expansions_tag = 'expansions='
    author_tag = 'author_id'

    url = BlockFromTwitterURL.BASE_URL + tweet_id + '?' + expansions_tag + author_tag

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
      raise Exception(f'Request returned an error: {response.status_code}, {response.text}')

    return response.json()

  @staticmethod
  def check_if_tweet_is_public(json):
    not_authorized_type = 'https://api.twitter.com/2/problems/not-authorized-for-resource'
    error_output = json.get('errors')
    if error_output:
      if error_output[0].get('type') == not_authorized_type:
        raise Exception('Retrieved tweet is not authorized to be viewed by the public')

    return


def main():
  json = BlockFromTwitterURL.get_json('https://twitter.com/jack/status/1247616214769086465')

if __name__ == "__main__":
  main()
