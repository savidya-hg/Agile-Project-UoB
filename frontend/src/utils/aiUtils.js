import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

let model = null;

export const loadModel = async () => {
  if (!model) {
    model = await mobilenet.load();
  }
  return model;
};

export const getImageVector = async (imageElement) => {
  const model = await loadModel();
  const logits = await model.infer(imageElement, { embedding: true });
  return Array.from(logits.dataSync());
};

export const cosineSimilarity = (vecA, vecB) => {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dot / (normA * normB);
};