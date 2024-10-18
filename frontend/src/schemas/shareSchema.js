import { z } from "zod";

const today = new Date();
const minimumStartDate = new Date("2010-01-01");

const shareSchema = z
  .object({
    id: z.string().optional(),
    ticker: z.string({ message: "O ticket é obrigatório" }),
    start: z.coerce.date({ message: "Data inválida!" }).min(minimumStartDate, {
      message: "A data inicial não pode ser inferior a 1º de janeiro de 2010.",
    }),
    end: z.coerce.date({ message: "Data inválida!" }).max(today, {
      message: "A data final não pode ser superior à data atual.",
    }),
    days: z
      .number({ message: "O número de dias é obrigatório" })
      .positive("O número de dias deve ser positivo."),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "A data inicial deve ser anterior à data final.",
    path: ["start", "end"],
  });

export default shareSchema;
