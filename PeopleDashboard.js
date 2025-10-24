
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
            person.push(`${value.name.last}`);
            person.push(`${value.cell}`);
            people.push(person);
        }
        people.sort((a,b) => a[7].localeCompare(b[7]));
        console.log(people);

        let count = 1;
        for (const i in people) {
            $('#people').append(`<tr title="${people[i][8]}" id="person${count}>">
                <td>${people[i][0]}</td>
                <td>${people[i][1]}</td>
                <td>${people[i][2]}</td>
                <td>${people[i][3]}</td>
                <td>${people[i][4]}</td>
                <td>${people[i][5]}</td>
                <td>${people[i][6]}</td>
            </tr>`)
        }
	} catch (e) {
		console.log("Error " + e);
	}
}

buildTable();
