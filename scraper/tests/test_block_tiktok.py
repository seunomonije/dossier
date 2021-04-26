import pytest
from ..Block import Block

examples = {
  'seun': 'https://www.tiktok.com/@s3un/video/6909095151839366406?lang=en&is_copy_url=1&is_from_webapp=v1',
}

def test_seun_tiktok():
  url = examples.get('seun')
  block = Block(url)
  assert str(block) == """{'block_title': 'seun', 'block_description': 'Success is a journey..just keep working. Merry Christmas/Happy Holidays y’all ❤️ #athlete #football #foryou', 'block_image_url': 'https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/8daa9273a86d4219a502d8bca96dde94?x-expires=1619416800&x-signature=CwxA5jPfnrmTc6SMyFuN1%2FIb%2B7I%3D', 'block_url': 'https://www.tiktok.com/@s3un/video/6909095151839366406?lang=en&is_copy_url=1&is_from_webapp=v1'}"""
