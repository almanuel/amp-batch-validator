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
fails = 0
passes = 0
row_number = 0
with open(csv_path, 'rb') as file:
	reader = csv.DictReader(file)
	for row in reader:
		url = _get_url(row['AMP URL'])
		row_number += 1
		print "ROW " + str(row_number)
		return_code = call(['amphtml-validator', url])
		print ""
		if return_code == 0:
			passes += 1
		else:
			fails += 1
	print "TOTAL PASSES: " + str(passes)
	print "TOTAL FAILS: " + str(fails)






