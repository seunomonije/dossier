import os
import requests
import json

class BlockFromTikTokURL:
  BASE_URL = 'https://www.tiktok.com/oembed?'

  @staticmethod
  def get_json(url):
    try:
      compatible_url = url
      is_short_url = BlockFromTikTokURL.determine_short_url(url)
      if is_short_url:
        compatible_url = BlockFromTikTokURL.get_long_url_from_short(url)
      
      json_data = BlockFromTikTokURL.get_json_from_url(compatible_url)
      return json_data
    except Exception as e:
      print(e)

  @staticmethod
  def determine_short_url(url):
     # Cut it to check if its the short version
    if url[0:8] == 'https://':
      cut_url = url[8:]
    elif url[0:7] == 'http://':
      cut_url = url[7:]

    split_url = cut_url.split('.')

    # Need to add more cases
    if cut_url[0] == 'vm':
      return True

    return False

  @staticmethod
  def get_long_url_from_short(short_url):
    fake_browser_headers = [
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1)',
      'AppleWebKit/537.36 (KHTML, like Gecko)',
      'Chrome/39.0.2171.95',
      'Safari/537.36',
    ]

    headers = {'User-Agent': ' '.join(fake_browser_headers)}
    response = requests.get(short_url, headers=headers)

    return response.url

  @staticmethod
  def get_json_from_url(url):
    url_flag = 'url='

    request_url = BlockFromTikTokURL.BASE_URL + url_flag + url
    response = requests.get(request_url)
    
    return response.json()

def main():
  json = BlockFromTikTokURL.get_json('https://www.tiktok.com/@s3un/video/6909095151839366406?lang=en&is_copy_url=1&is_from_webapp=v1')
  print(json)

if __name__ == "__main__":
  main()