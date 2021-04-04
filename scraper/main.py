from Block import Block

def main():
  url = input('Enter a url: ')
  block = Block(url)
  block.print_block()

if __name__ == '__main__':
  # TEST
  main()
