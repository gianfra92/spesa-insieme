export default {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// src/common/dto/base-response.dto.ts
export class BaseResponseDto<T> {
  success: boolean;
  data?: T;
  message?: string;
}
