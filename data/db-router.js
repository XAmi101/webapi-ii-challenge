const express = require("express");
const router = express.Router();
const db = require("./db.js");

//same as /api/posts
router.get("/", (req, res) => {
	db.find()
		.then(data => {
			res.status(200).json(data);
		})
		.catch(error => {
			console.log("get error", error);
			response
				.status(500)
				.json({ error: "The users information could not be retrieved." });
		});
});

//same as /api/posts/:id
router.get("/:id", (req, res) => {
	const id = req.params.id;
	db.findById(id)
		.then(data => {
			if (data.length>0) {
				res.status(200).json(data);
			} else {
				res.status(404).json({
					message: "The post with given id doesn't exist"
				});
			}
		})
		.catch(error => {
			response.status(500).json({
				error: "The post information with given id could not be retrieved."
			});
		});
});

//same as /api/posts
router.post("/", (req, res) => {
	const changes = req.body;
	// console.log("changes", change);
	if (!changes.title || !changes.contents) {
		res.status(400).json({
			errorMessage: "Please provide title and contents for the post."
		});
	} else {
		db.insert(changes)
			.then(data => {
				res.status(201).json(data);
			})
			.catch(error => {
				res.status(500).json({
					error: "There was an error while saving the post to the database"
				});
			});
	}
});

// same as api/posts/:id
router.put("/:id", (req, res) => {
	// const {title, contents} = = req.body;
	const changes = req.body;
	const id = req.params.id;

	if (!changes) {
		res.status(400).json({
			errorMessage: "Please provide title or contents for the post."
		});
	} else {
		db.update(id, changes)
			.then(data => {
				if (data) {
					res.status(200).json(data);
				} else {
					res.status(404).json({
						message: "The post with the specified ID does not exist."
					});
				}
			})
			.catch(error => {
				res.status(500).json({ message: "The user could not be modified" });
			});
	}
});



//delete
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    db.remove(id)
    .then(data => {
        if (data) {
            res.status(200).json({ message: 'The post has been deleted' });
        } else {
            res.status(404).json({ message: 'The post with given id does not exist' });
          }
    })
    .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({ error: 'Post could not be removed' });
      });
})


/////// <<<<<< COmments

// same as api/posts/:id/comments
// router.get ("/:id/comments", (req, res) => {
//     const id = req.params.id;
//     db.findCommentById(id)
// 		.then(data => {
// 			if (data) {
// 				res.status(200).json(data);
// 			} else {
// 				res.status(404).json({
// 					message: "The post with given id doesn't exist"
// 				});
// 			}
// 		})
// 		.catch(error => {
// 			response.status(500).json({
// 				error: "The post information with given id could not be retrieved."
// 			});
// 		});
// })



router.get ("/:id/comments", (req, res) => {
    const id = req.params.id;
    
    db.findPostComments(id)
		.then(data => {
			if (data.length>0) {
				res.status(200).json(data);
			} else {
				res.status(404).json({
					message: "The post with given id doesn't exist"
				});
			}
		})
		.catch(error => {
			response.status(500).json({
				error: "The post information with given id could not be retrieved."
			});
		});
})



// add comment
router.post ("/:id/comments", (req, res) => {
    const update = {...req.body, post_id: req.params.id};

    // const id = req.params.id;
    if (!update.text ) {
		res.status(400).json({
			errorMessage: "Please provide text for the post."
		});
	} else {
        db.insertComment(update)
			.then(data => {
				res.status(201).json(data);
			})
			.catch(error => {
				res.status(500).json({
					error: "There was an error while saving the comment to the database"
				});
			}); 
	}
});


//export default router; << the equivalent in react
module.exports = router;
