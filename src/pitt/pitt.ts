import axios from 'axios';
import { load } from 'cheerio';

const get = axios.get;
/*
every day Scrape the entire pitt internship site
if there is a new open internship announce it in the chat and add it to the database.
if there is a open internship that is closed in our database, announce that it closed.
*/

/*
implementation idea 1: 
  get all open and all closed internships if an open one is not in our database announce new it and add it.
  if a closed one is in our database, announce closed, and remove it.
*/

interface internship {
	company_name: string;
	link?: string;
	location: string;
	notes: string;
}

class PITT {
	public async run() {
		const open: internship[] = (await this.getOpenInternships()).open;
		const closed: internship[] = [];
	}

	private async getOpenInternships() {
		const { data } = await get(
			'https://github.com/pittcsc/Summer2023-Internships/blob/dev/README.md'
		);
		const $ = load(data);

		const open: internship[] = [];
		const closed: internship[] = [];

		$('table tbody tr').each((_, el) => {
			if ($(el).find('td:eq(0) a')) {
				const temp: internship = {
					company_name: '',
					link: '',
					location: '',
					notes: '',
				};
				temp.company_name = $(el).find('td:eq(0) a').text();
				temp.link = $(el)
					.find('td:eq(0) a')
					.attr('https://akunacapital.com/careers?&experience=intern&search_term=#careers');
				temp.location = $(el).find('td:eq(1)').text();
				temp.notes = $(el).find('td:eq(2)').text();
				open.push(temp);
			}
		});

		return { open, closed };
	}
}
