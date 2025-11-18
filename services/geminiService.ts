import { GoogleGenAI, Type } from "@google/genai";
import { FortuneRequest, FortuneResponse, TarotResponse } from "../types";

export const generateFortune = async (request: FortuneRequest): Promise<FortuneResponse> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Thiếu khóa API. Vui lòng kiểm tra cấu hình của bạn.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Bạn là một chuyên gia chiêm tinh và người xem bói thân thiện.
    Phân tích ngày sinh của người dùng (${request.birthdate}) và chủ đề họ quan tâm (${request.topic}).
    
    Hãy cung cấp kết quả bao gồm:
    1. Đặc điểm tính cách dựa trên ngày sinh (Cung hoàng đạo, thần số học).
    2. Dự đoán xu hướng tương lai liên quan đến chủ đề đã chọn.
    3. Lời khuyên thực tế, tích cực và dễ áp dụng.
    
    Yêu cầu bắt buộc:
    - Ngôn ngữ: Tiếng Việt.
    - Không hù dọa, không tiêu cực.
    - Giọng điệu thân thiện, nhẹ nhàng, dễ hiểu.
    - Tích cực và mang tính động viên.
    - Ngắn gọn nhưng ý nghĩa (khoảng 3-4 câu cho mỗi phần).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            personality: {
              type: Type.STRING,
              description: "Phân tích tính cách dựa trên ngày sinh."
            },
            prediction: {
              type: Type.STRING,
              description: "Dự đoán tương lai về chủ đề đã chọn."
            },
            advice: {
              type: Type.STRING,
              description: "Lời khuyên thực tế và tích cực."
            }
          },
          required: ["personality", "prediction", "advice"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("Không có nội dung được tạo.");
    }

    const parsedData = JSON.parse(jsonText) as FortuneResponse;
    return parsedData;

  } catch (error) {
    console.error("Error generating fortune:", error);
    throw new Error("Không thể kết nối với các vì sao. Vui lòng thử lại sau.");
  }
};

export const generateTarotReading = async (): Promise<TarotResponse> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Thiếu khóa API. Vui lòng kiểm tra cấu hình của bạn.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const seed = Math.floor(Math.random() * 1000000);

  const prompt = `
    Bạn là một chuyên gia Tarot thân thiện. 
    Hãy rút ngẫu nhiên một lá bài Tarot cho ngày hôm nay (Random seed: ${seed}).
    
    Cung cấp kết quả phân tích dưới dạng JSON bao gồm:
    1. Tên lá bài và chiều (Xuôi hoặc Ngược).
    2. Mã định danh lá bài (cardId) theo chuẩn PKT để hiển thị hình ảnh.
    3. Ý nghĩa cốt lõi.
    4. Ý nghĩa cho ngày hôm nay.
    5. Lời khuyên.

    QUY TẮC cardId (Bắt buộc phải đúng định dạng):
    - Major Arcana: ar00 (Fool) đến ar21 (World).
    - Wands (Gậy): wa01 (Ace) đến wa14 (King).
    - Cups (Cốc): cu01 (Ace) đến cu14 (King).
    - Swords (Kiếm): sw01 (Ace) đến sw14 (King).
    - Pentacles (Tiền): pe01 (Ace) đến pe14 (King).
    - Ví dụ: The Fool -> ar00, Ace of Cups -> cu01, Queen of Swords -> sw13.

    Yêu cầu nội dung:
    - Ngôn ngữ: Tiếng Việt.
    - Giọng điệu: Tích cực, chữa lành.
    - Orientation: Trả về "Xuôi" hoặc "Ngược".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            cardName: {
              type: Type.STRING,
              description: "Tên lá bài Tarot (ví dụ: The Fool)."
            },
            cardId: {
              type: Type.STRING,
              description: "Mã định danh theo chuẩn PKT (ví dụ: ar00, cu01)."
            },
            orientation: {
              type: Type.STRING,
              description: "Chiều của lá bài: 'Xuôi' hoặc 'Ngược'."
            },
            meaning: {
              type: Type.STRING,
              description: "Ý nghĩa cốt lõi."
            },
            todayInterpretation: {
              type: Type.STRING,
              description: "Ý nghĩa cụ thể cho ngày hôm nay."
            },
            advice: {
              type: Type.STRING,
              description: "Lời khuyên thực tế."
            }
          },
          required: ["cardName", "cardId", "orientation", "meaning", "todayInterpretation", "advice"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("Không có nội dung được tạo.");
    }

    const parsedData = JSON.parse(jsonText) as TarotResponse;
    return parsedData;

  } catch (error) {
    console.error("Error generating tarot:", error);
    throw new Error("Không thể kết nối với bộ bài. Vui lòng thử lại sau.");
  }
};