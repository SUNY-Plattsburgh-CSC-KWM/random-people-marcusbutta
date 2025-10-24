
async function getPeople() {
	try {
		const response = await fetch("https://randomuser.me/api/?results=25&nat=us");
		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status}`);
        }
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(`Could not get names: ${error}`);
	}
}

async function buildTable() {
	try {
		const data = await getPeople();
        let people = [];
        console.log(data.results);
        for (const value of data.results) {
            let person = []
            person.push(`${value.name.title} ${value.name.first} ${value.name.last}`);
            person.push(`${value.location.street.number} ${value.location.street.name}`);
            person.push(`${value.location.city}`);
            person.push(`${value.location.state}`);
            person.push(`${value.location.postcode}`);
            person.push(`${value.location.coordinates.latitude}`);
            person.push(`${value.location.coordinates.longitude}`);
            people.push(person);
        }
        console.log(people);
	} catch (e) {
		console.log("Error " + e);
	}
}

buildTable();
