# amp-batch-validator
A simple AMP HTML validator for multiple urls extracted from a CSV file.

## Requirements
- Install the official AMP validator command line tool: 
  - npm install -g amphtml-validator
  - https://www.ampproject.org/docs/guides/debug/validate#command-line-tool
- Python >= 2.7

## Usage
- Run with a CSV file. There must be a 'AMP URL' column
  - python amp_validate.py <some_file.csv>
- The same but replacing the host of every URL with a custom host. Useful for testing in different development environments.
  - python amp_validate.py <some_file.csv> <custom_host>
