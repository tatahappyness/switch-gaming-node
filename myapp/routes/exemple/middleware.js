
const granted = (user, role) => {
	 let test = (user.role != role) ? false : true;
	 return test;
 }
 
 module.exports = granted