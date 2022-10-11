it('Upload image via API', () => {

		const data = new FormData();
		const fileToUpload = fixtureImage.image; 
		const aliasName = "imageUploadRequest";
                 const APIurl="/imageUpload";

        const authorization="Bearer kkkkkkallllllajdllllllllllllllllllllldkjdkkdf";
		data.append("hasHeader", "true");

		cy.intercept({
			method: "POST",
			url: APIurl

		})
			.as(aliasName)
			.window()
			.then((win) => {
				cy.fixture(fileToUpload, "binary")
					.then((binary) => Cypress.Blob.binaryStringToBlob(binary))
					.then((blob) => {
						const xhr = new win.XMLHttpRequest();

						data.set("profile_picture", blob, fileToUpload);

						xhr.open("POST", APIurl);

						xhr.setRequestHeader("Authorization", authorization);

						xhr.send(data);

					});

			})

		cy.wait('@imageUploadRequest').then(({ response }) => {
        //any assertions related to endpoint come here 
        //assertion related to status code, response time, properties and their values
			expect(response.statusCode).to.eq(200)
			expect(response.body).to.contain.property("id")
			
		})

	})