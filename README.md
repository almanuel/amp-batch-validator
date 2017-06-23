# amp-batch-validator
A simple AMP HTML validator for multiple urls extracted from a CSV file.

## Features
- Validate multiple AMP pages listed on a CSV file. (Usual output of _Google Search Console_)
- Validate multiple AMP pages listed on a CSV file using a custom domain (useful for dev environments e.g. http:dev.example.com)

## Versions
Currently works has two versions:
- NodeJS version (recommended).
- Python version.

## NodeJS version
### Usage
- Go to `nodejs` directory.
- Run `npm install`
- Run with a CSV file (It must have a 'AMP URL' column):
  - `node amp_validate.js <some_file.csv>`
- Run with a CSV file (It must have a 'AMP URL' column) and a custom domain. Will run the script with every path in the CSV file but changing the domain.
  - `node amp_validate.js <some_file.csv> <http://dev.example.com>`
- In both cases, the output will be shown on standard output i.e. the terminal.

## Python version (deprecated)
### Requirements
- Install the official AMP validator command line tool: 
  - `npm install -g amphtml-validator`
  - https://www.ampproject.org/docs/guides/debug/validate#command-line-tool
- Python >= 2.7

### Usage
- Run with a CSV file. There must be a 'AMP URL' column
  - `python amp_validate.py <some_file.csv>`
- The same but replacing the host of every URL with a custom host. Useful for testing in different development environments.
  - `python amp_validate.py <some_file.csv> <custom_host>`
