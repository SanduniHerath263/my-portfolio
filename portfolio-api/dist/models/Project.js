import { Schema, model } from 'mongoose';
const ProjectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, maxlength: 220 },
    tags: { type: [String], default: [] },
    imageUrl: String,
    repoUrl: String,
    liveUrl: String
}, { timestamps: true });
export default model('Project', ProjectSchema);
//# sourceMappingURL=Project.js.map