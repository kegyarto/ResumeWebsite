const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/users");
const Project = require("../models/project");
const route = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/upload");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 4,
  },
  fileFilter: fileFilter,
});

route.post("/create", upload.single("projectImage"), async (req, res) => {
  const { title, description, link } = req.body;
  if (!title || title.length <= 0) {
    var errormsg = { "error:": "no title" };
    res.status(400);
    res.json(errormsg);
    return;
  } else if (!description || description.length <= 0) {
    var errormsg = { "error:": "no description" };
    res.status(400);
    res.json(errormsg);
    return;
  }

  sessionID = req.sessionID;
  var user = User.findOne({ sessionID }, (err, user) => {
    return user;
  });

  if (!user) {
    var errormsg = { error: "not logged in" };
    res.status(400);
    res.json(errormsg);
    return;
  }

  let project = {};
  project.userID = user._id;
  project.title = title;
  project.description = description;
  project.link = link;

  let file_name = "default-app.png";
  if (req.file !== undefined) {
    file_name = req.file.path;
    if (file_name.startsWith("public/images/upload/")) {
      file_name = file_name.substring(21);
    }
  }
  project.image = file_name;

  let projectModel = new Project(project);
  await projectModel.save();
  res.json(projectModel);
});

route.get("/read", (req, res) => {
  console.log("in /read");
  Project.find({}, (err, projects) => {
    if (err) {
      console.log("Error on reading projects");
    }
    console.log("Successfully read " + projects.length + " projects");
    res.send(projects);
  });
});

route.get("/read/:id", (req, res) => {
  console.log("/read/:id " + req.params.id);

  Project.findById(req.params.id, (err, project) => {
    if (err) {
      res.send("Error in finding " + req.params.id);
    }
    res.status(200);
    res.send(project)
  });
});

route.put("/update/:id", (req, res) => {
  console.log("/update/:id " + req.params.id);

  Project.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    (err, project) => {
      if (err) {
        res.send("Error in updating " + req.params.id);
        return;
      }
      //TODO: Handle Update image
      res.status(200);
      res.send("Project Successfully Updated");
    }
  );
});

route.get("/delete/:id", (req, res) => {
  console.log("Deleting: " + req.params.id);
  Project.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.send("Error in deleting " + req.params.id);
      return;
    }
    res.status(200);
    //TODO: Delete image files
    res.send("Project Successfully Deleted");
  });
});

module.exports = route;
