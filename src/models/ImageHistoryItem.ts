export type ImageClassificationResult = {label: string; probability: number};

/**
 * An item for the images history page.
 */
interface ImageHistoryItem {
  /**
   * The unique id of the item.
   */
  id: number;
  /**
   * The date and time of the item.
   */
  date: Date;
  /**
   * The image id of the item.
   */
  imageId: string;
  /**
   * The classification result of the item, representing the classified label with the highest probability/confidence.
   */
  classificationResult: ImageClassificationResult;
}

export default ImageHistoryItem;
