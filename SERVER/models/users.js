const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 50,
    },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profilePic: String,
    token: {type: String},
    resume: [{name: String, resumeUrl: String}] || null,
    phone: String,
    location: String,
    experience: [
      {
        type:
          {
            title: String || null,
            company: String || null,
            location: String || null,
            startDate: Date || null,
            endDate: Date || null,
            description: String || null,
            employmentType: String || null,
          } || null,
      },
    ],
    role: {
      type: String,
      enum: ["user", "admin", "employer"],
      default: "user",
    },
    education: [{type: {
      institution: String || null,
      school: String || null,
      degree: String || null,
      fieldOfStudy: String || null,
      startDate: Date || null,
      endDate: Date || null,
      grade: String || null,
      gradeType: String || null,
      activities: String || null,
    } || null}],
    projects: [{type: {
      title: String || null,
      description: String || null,
      startDate: Date || null,
      endDate: Date || null,
      skills: [String] || null,
      projectUrl: String || null,
      githubUrl: String || null,
    } || null}],
    skills: [String],
    about: String,
    interests: [String],
    certification: [{type: {
      name: String || null,
      institution: String || null,
      issueDate: Date || null,
      expirationDate: Date || null,
      credentialId: String || null,
      credentialUrl: String || null,
    } || null}],
    socialLinks: {
      github: String || null,
      linkedin: String || null,
      website: String || null,
      twitter: String || null,
    },
    appliedJobs: [{job_id: {type: mongoose.SchemaTypes.ObjectId, ref: 'job'}}]
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.token;
  delete user.__v;
  delete user.role;
  return user;
};

module.exports = mongoose.model("user", userSchema);
