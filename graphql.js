() => {
  return {
    isGraphql: () => {
      pm.test("response has http code 200", function () {
        pm.response.to.have.status(200);
      });

      pm.test("response must be valid and have a body", function () {
        pm.response.to.be.ok;
        pm.response.to.be.withBody;
        pm.response.to.be.json;
      });
    },
    isSuccess: () => {
      pm.test("response should be okay to process", function () { 
        pm.response.to.not.be.error; 
        pm.response.to.not.have.jsonBody("error"); 
        pm.response.to.not.have.jsonBody("errors"); 
      });
    }
  }
};
