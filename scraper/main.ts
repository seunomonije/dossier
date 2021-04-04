
class Block_Exception {
  static throw_error(error: string) {
    throw new Error(error);
  }
}

class BlockFromHackerNewsLink {
  private static BASE_URL: string = 'https://hacker-news.firebaseio.com/v0/';

  private static get_id_from_url(url: string) {
    const split_url: string[] = url.split('?');
    let url_id : string = null;
    
    // We always know the first it garbage, so we can push it out
    for (let param of split_url.shift()) {
      let param_tag: string = param.substr(0,3);
      if (param_tag == 'id=') {
        // Rest of the string
        url_id = param.substr(3, param.length)
      }
    }

    const error_message: string = 'The user gave a bad id';
    return (url_id ? url_id : Block_Exception.throw_error(error_message))
  }

  private static get_json_from_id(item_id: string) {
    const item_tag: string = 'item/';
    const result_type: string = '.json';

    const request_link = this.BASE_URL + item_tag + item_id + result_type;

  }
}
