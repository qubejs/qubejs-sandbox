var a = new Promise((resolve, reject)=>{
  // resolve('yes');
  // reject('no');
  throw new Error('not found');
});



a.then((message)=>{
  console.log('success:'+ message);
}).catch((message)=>{
  console.log('error:'+ message)
})