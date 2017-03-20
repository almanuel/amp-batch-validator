import sys
import csv
from subprocess import call


csv_path = sys.argv[1]
with open(csv_path, 'rb') as file:
	reader = csv.DictReader(file)
	for row in reader:
		url = row['AMP URL']
		print call(['amphtml-validator', url])
