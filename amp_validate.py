import sys
import csv
from subprocess import call


# Helper: if host parameter exists, replace original host with param.
def _get_url(original_url):
	if (len(sys.argv) > 2):
		new_host = sys.argv[2]
		url_parts = original_url.split('/')
		url_parts = url_parts[3:]
		url_parts.insert(0, new_host)
		new_url = '/'.join(url_parts)
		return new_url
	else:
		return original_url

# Main
csv_path = sys.argv[1]
with open(csv_path, 'rb') as file:
	reader = csv.DictReader(file)
	for row in reader:
		url = _get_url(row['AMP URL'])
		print call(['amphtml-validator', url])






