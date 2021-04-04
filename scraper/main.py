from Block import Block

def main():
  block_type = input('Enter your block source (Leave blank for any): ')
  url = input('Enter a url: ')
  block = Block(block_type, url)
  block.print_block()

if __name__ == '__main__':
  # TEST
  main()