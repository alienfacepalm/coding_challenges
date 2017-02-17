const categories = [
	[1, 'device', 'http', 'HTTP'],
	[2, 'device', 'dns', 'DNS'],
	[3, 'device', 'ldap', 'LDAP'],
	[4, 'device', 'mongo', 'MongoDB']
];

const metrics = [
	[1, 1, 'req', 'Requests'],
	[2, 1, 'rsp', 'Responses'],
	[3, 1, 'tprocess', 'Server Processing Time'],
	[4, 2, 'req', 'Requests'],
	[5, 2, 'rsp', 'Responses'],
	[6, 2, 'trunc', 'Truncated Responses'],
	[7, 3, 'plain', 'Plain Text Messages'],
	[8, 3, 'sasl', 'SASL Messages'],
	[9, 3, 'error', 'Errors'],
	[10, 4, 'req', 'Requests'],
	[11, 4, 'rsp', 'Responses'],
	[12, 4, 'tprocess', 'Server Processing Time']
];

const CatalogAPI = {

	getCategories(){
		return Promise.resolve(categories);
	},

	getMetrics(){
		return Promise.resolve(metrics);
	}

};

const Utilities = {

	mapCategory(category){
		return {
      		id: category[0],
      		object_type: category[1],
      		stat_name: category[2],
      		display_name: category[3]
		 };
	},

	mapMetric(metric){
		return {
			id: metric[0],
			category_id: metric[1],
			field_name: metric[2],
			display_name: metric[3]
		};
	}

}

class Catalog {

	constructor(){
		this._categories = null;
		this._metrics = null;
	}

	initialize(){
		return Promise.all([
			CatalogAPI.getCategories(),
			CatalogAPI.getMetrics()
		]).then(data => {
			this._categories = data[0];
			this._metrics = data[1];
		});
	}

	getCategoryById(id){
	    return Utilities.mapCategory(this._categories.find(category => category[0] === id));
	}
	
	getCategoryByStatString(statString){
		let object_type = statString.split('.')[1],
			stat_name = statString.split('.')[2];		
	    return Utilities.mapCategory(this._categories.find(category => category[1] === object_type && category[2] === stat_name));
	} 

	getMetricById(id){
		return Utilities.mapMetric(this._metrics.find(metric => metric[0] === id));
	}

	getMetricByStatString(statString){
		let object_type = statString.split('.')[1],
			stat_name = statString.split('.')[2].split(':')[0],
			field_name = statString.split('.')[2].split(':')[1],
            categoryId = Utilities.mapCategory(this._categories.find(category => category[1] === object_type && category[2] === stat_name)).id;
		return Utilities.mapMetric(this._metrics.find(metric => metric[1] === categoryId));
	}
	
}


let c = new Catalog();

c.initialize().then(() => {

	let category1, 
		category2, 
		metric1, 
		metric2;

	category1 = c.getCategoryById(1);
	category2 = c.getCategoryByStatString('extrahop.device.http');

 	if(category1.id === category2.id){
		console.log(`${category1.display_name} lookups match!`);
	}	

	metric1 = c.getMetricById(4);
	metric2 = c.getMetricByStatString('extrahop.device.dns:req');
 
	if(metric1.id === metric2.id){
		console.log(`${metric1.display_name} lookups match!`)
	}	

});