-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 04-08-2025 a las 20:42:12
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `encuesta_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

DROP TABLE IF EXISTS `preguntas`;
CREATE TABLE IF NOT EXISTS `preguntas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `texto` text NOT NULL,
  `tipo` enum('escala','observacion') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `preguntas`
--

INSERT INTO `preguntas` (`id`, `texto`, `tipo`) VALUES
(1, '1. ¿Consideras que hay buena comunicación y transmisión de ideas en tu área?', 'escala'),
(2, '2. ¿Piensas que los comentarios o sugerencias que les comunicas a tus líderes son\r\ntomadas en cuenta?', 'escala'),
(3, '3. ¿Tus líderes comunican de manera clara sus expectativas y/o instrucciones?', 'escala'),
(4, '4. ¿Crees que la comunicación entre compañeros es abierta (expresión de ideas clara y directa)?', 'escala'),
(5, '5. ¿Hay factores que provoquen que la comunicación con tus compañeros de área sea interrumpida o no se logre?', 'escala'),
(6, '6. ¿Cuentas con los medios para comunicar información sobre tu trabajo?', 'escala'),
(7, '7. ¿Existe colaboración entre los miembros de tu equipo?', 'escala'),
(8, '8. Comentarios sobre el tema:', 'observacion'),
(9, '9. ¿Tu nivel de estrés en el trabajo es alto?', 'escala'),
(10, '10. ¿Tienes tiempo para hacer pausas durante el día?', 'escala'),
(11, '11. ¿Consideras que tu carga de trabajo es excesiva?', 'escala'),
(12, '12. En cuanto a convivencias en la empresa, ¿consideras que se planifican de forma adecuada estas actividades?', 'escala'),
(13, '13. ¿Participas en las actividades recreativas que se hacen en la empresa?', 'escala'),
(14, '14. ¿Cuáles son las fuentes de estrés más frecuentes en tu día a día?', 'observacion'),
(15, '15. ¿Qué sugerencia darías para futuras actividades recreativas y/o convivencias (cumpleaños, días conmemorativos, celebraciones, fin de año)?', 'observacion'),
(16, '16. Comentarios sobre el tema:', 'observacion'),
(17, '17. ¿Existen inconvenientes para solicitar algún permiso personal?', 'escala'),
(18, '18. ¿Te sientes forzado a trabajar fuera de tu horario laboral?', 'escala'),
(19, '19. ¿Te puedes desconectar de los asuntos relacionados con el trabajo cuando\r\nno estás en tu horario laboral?', 'escala'),
(20, '20. ¿En tu trabajo tratas los problemas emocionalmente con mucha calma?', 'escala'),
(21, '21. ¿Te sientes frustrado o aburrido en tu trabajo?', 'escala'),
(22, '22. De ocurrir, ¿has tenido padecimientos físicos sin causa aparente? (Visión borrosa, cansancio excesivo, enfermedades cardíacas o intestinales, dolor de cabeza, trastornos del sueño, ansiedad, u otras).', 'observacion'),
(23, '23. Comentarios sobre el tema:', 'observacion'),
(24, '24. ¿En tu centro de trabajo todas las personas que laboran obtienen un trato digno y decente?', 'escala'),
(25, '25. ¿Percibe tratos diferenciales en su trabajo?', 'escala'),
(26, '26. ¿Alguna vez ha visto actos discriminatorios entre los miembros de la organización?', 'escala'),
(27, '27. ¿Los superiores reciben un trato mucho más respetuoso que subordinados y\r\npersonal administrativo?', 'escala'),
(28, '28. ¿Dirías que la empresa fomenta una cultura de respeto, diversidad e\r\ninclusión?', 'escala'),
(29, '29. ¿Cuál es tu opinión con respecto al trato que te dan en la empresa?', 'observacion'),
(30, '30. ¿Cuentas con el material y equipo necesario para realizar su trabajo?', 'escala'),
(31, '31. ¿El equipo que empleas en sus actividades diarias funciona correctamente?', 'escala'),
(32, '32. ¿Tu equipo de cómputo cuenta con los softwares necesarios para realizar su\r\ntrabajo?', 'escala'),
(33, '33. ¿El equipo que ocupas esta actualizado y es de buena calidad?', 'escala'),
(34, '34. ¿Qué material o equipo consideras que hace falta para el correcto desarrollo de sus actividades?', 'observacion'),
(35, '35. ¿Alguno de los servicios de luz, sanitarios, internet, suele presentar fallas?', 'escala'),
(36, '36. ¿Estás satisfecho con la iluminación y ventilación de tu espacio de trabajo?', 'escala'),
(37, '37. ¿Existe botiquín de primeros auxilios dotado y señalizado?', 'escala'),
(38, '38. ¿Todas las instalaciones eléctricas cuentan con switches y tomacorrientes?', 'escala'),
(39, '39. ¿Los sanitarios, pasillos y demás instalaciones se encuentran limpios y en buen estado?', 'escala'),
(40, '40. ¿Qué tipo de servicio presenta fallas o hace falta en tu área de trabajo?', 'observacion'),
(41, '41. ¿Se siente cómodo físicamente en su espacio de trabajo?', 'escala'),
(42, '42. ¿Cuento con el mobiliario necesario y en buenas condiciones?', 'escala'),
(43, '43. ¿Tengo el espacio suficiente en mi área de trabajo?', 'escala'),
(44, '44. ¿El nivel de ruido en su lugar de trabajo es soportable?', 'escala'),
(45, '45. ¿Los puestos de trabajo se encuentran debidamente aseados (incluye estantes, cajones, paredes, detrás de mesas, cables, equipos)?', 'escala'),
(46, ' 46. ¿Qué cambiarías de tu espacio de trabajo?', 'observacion'),
(47, '47. ¿Consideras que las instalaciones de la empresa son seguras?', 'escala'),
(48, '48. ¿Se siente seguro en las instalaciones de la empresa?', 'escala'),
(49, '49. ¿Crees que las instalaciones cubren las necesidades de todos los empleados?', 'escala'),
(50, '50. ¿Las salidas de emergencia se encuentran libres de obstáculos y disponibles?', 'escala'),
(51, '51. ¿Cuentan con señalamientos de emergencia?', 'escala'),
(52, ' 52. ¿Qué opinas sobre las condiciones ambientales de la empresa?', 'observacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

DROP TABLE IF EXISTS `respuestas`;
CREATE TABLE IF NOT EXISTS `respuestas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `id_pregunta` int DEFAULT NULL,
  `respuesta_escala` int DEFAULT NULL,
  `respuesta_texto` text,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_pregunta` (`id_pregunta`)
) ENGINE=MyISAM AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `respuestas`
--

INSERT INTO `respuestas` (`id`, `id_usuario`, `id_pregunta`, `respuesta_escala`, `respuesta_texto`, `fecha`) VALUES
(1, 2, 1, 1, NULL, '2025-08-04 19:33:42'),
(2, 2, 2, 5, NULL, '2025-08-04 19:33:42'),
(3, 2, 3, 5, NULL, '2025-08-04 19:33:42'),
(4, 2, 5, 5, NULL, '2025-08-04 19:33:42'),
(5, 2, 4, 5, NULL, '2025-08-04 19:33:42'),
(6, 2, 6, 5, NULL, '2025-08-04 19:33:42'),
(7, 2, 7, 5, NULL, '2025-08-04 19:33:42'),
(8, 2, 8, NULL, 'dfdfdf', '2025-08-04 19:33:42'),
(9, 2, 9, 4, NULL, '2025-08-04 19:33:42'),
(10, 2, 10, 4, NULL, '2025-08-04 19:33:42'),
(11, 2, 11, 5, NULL, '2025-08-04 19:33:42'),
(12, 2, 12, 5, NULL, '2025-08-04 19:33:42'),
(13, 2, 13, 4, NULL, '2025-08-04 19:33:42'),
(14, 2, 14, NULL, 'efewwev', '2025-08-04 19:33:42'),
(15, 2, 15, NULL, 'wevwevv', '2025-08-04 19:33:42'),
(16, 2, 16, NULL, 'vweve', '2025-08-04 19:33:42'),
(17, 2, 17, 5, NULL, '2025-08-04 19:33:42'),
(18, 2, 19, 5, NULL, '2025-08-04 19:33:42'),
(19, 2, 18, 5, NULL, '2025-08-04 19:33:42'),
(20, 2, 20, 5, NULL, '2025-08-04 19:33:42'),
(21, 2, 21, 5, NULL, '2025-08-04 19:33:42'),
(22, 2, 22, NULL, 'evwvew', '2025-08-04 19:33:42'),
(23, 2, 23, NULL, 'eveve', '2025-08-04 19:33:42'),
(24, 2, 25, 5, NULL, '2025-08-04 19:33:42'),
(25, 2, 24, 5, NULL, '2025-08-04 19:33:42'),
(26, 2, 26, 5, NULL, '2025-08-04 19:33:42'),
(27, 2, 27, 5, NULL, '2025-08-04 19:33:42'),
(28, 2, 28, 5, NULL, '2025-08-04 19:33:42'),
(29, 2, 29, NULL, 'eveve', '2025-08-04 19:33:42'),
(30, 2, 30, 3, NULL, '2025-08-04 19:33:42'),
(31, 2, 31, 2, NULL, '2025-08-04 19:33:42'),
(32, 2, 32, 2, NULL, '2025-08-04 19:33:42'),
(33, 2, 33, 5, NULL, '2025-08-04 19:33:42'),
(34, 2, 34, NULL, 'evve', '2025-08-04 19:33:42'),
(35, 2, 35, 3, NULL, '2025-08-04 19:33:42'),
(36, 2, 36, 3, NULL, '2025-08-04 19:33:42'),
(37, 2, 37, 3, NULL, '2025-08-04 19:33:42'),
(38, 2, 38, 4, NULL, '2025-08-04 19:33:42'),
(39, 2, 39, 5, NULL, '2025-08-04 19:33:42'),
(40, 2, 40, NULL, 'evve', '2025-08-04 19:33:42'),
(41, 2, 41, 3, NULL, '2025-08-04 19:33:42'),
(42, 2, 42, 3, NULL, '2025-08-04 19:33:42'),
(43, 2, 43, 3, NULL, '2025-08-04 19:33:42'),
(44, 2, 44, 2, NULL, '2025-08-04 19:33:42'),
(45, 2, 45, 3, NULL, '2025-08-04 19:33:42'),
(46, 2, 46, NULL, 'evewv', '2025-08-04 19:33:42'),
(47, 2, 47, 1, NULL, '2025-08-04 19:33:42'),
(48, 2, 48, 1, NULL, '2025-08-04 19:33:42'),
(49, 2, 49, 5, NULL, '2025-08-04 19:33:42'),
(50, 2, 50, 4, NULL, '2025-08-04 19:33:42'),
(51, 2, 51, 3, NULL, '2025-08-04 19:33:42'),
(52, 2, 52, NULL, 'eveve', '2025-08-04 19:33:42'),
(53, 3, 1, 1, NULL, '2025-08-04 19:39:46'),
(54, 3, 2, 2, NULL, '2025-08-04 19:39:46'),
(55, 3, 3, 3, NULL, '2025-08-04 19:39:46'),
(56, 3, 4, 4, NULL, '2025-08-04 19:39:46'),
(57, 3, 5, 3, NULL, '2025-08-04 19:39:46'),
(58, 3, 7, 5, NULL, '2025-08-04 19:39:46'),
(59, 3, 6, 5, NULL, '2025-08-04 19:39:46'),
(60, 3, 8, NULL, 'gtgrg', '2025-08-04 19:39:46'),
(61, 3, 9, 2, NULL, '2025-08-04 19:39:46'),
(62, 3, 10, 3, NULL, '2025-08-04 19:39:46'),
(63, 3, 11, 2, NULL, '2025-08-04 19:39:46'),
(64, 3, 12, 3, NULL, '2025-08-04 19:39:46'),
(65, 3, 13, 4, NULL, '2025-08-04 19:39:46'),
(66, 3, 14, NULL, 'ggg', '2025-08-04 19:39:46'),
(67, 3, 15, NULL, 'tgtg', '2025-08-04 19:39:46'),
(68, 3, 16, NULL, 'gtgtg', '2025-08-04 19:39:46'),
(69, 3, 17, 2, NULL, '2025-08-04 19:39:46'),
(70, 3, 18, 2, NULL, '2025-08-04 19:39:46'),
(71, 3, 19, 3, NULL, '2025-08-04 19:39:46'),
(72, 3, 20, 4, NULL, '2025-08-04 19:39:46'),
(73, 3, 21, 5, NULL, '2025-08-04 19:39:46'),
(74, 3, 22, NULL, 'gtgt', '2025-08-04 19:39:46'),
(75, 3, 23, NULL, 'gtgtg', '2025-08-04 19:39:46'),
(76, 3, 24, 5, NULL, '2025-08-04 19:39:46'),
(77, 3, 25, 5, NULL, '2025-08-04 19:39:46'),
(78, 3, 26, 3, NULL, '2025-08-04 19:39:46'),
(79, 3, 27, 3, NULL, '2025-08-04 19:39:46'),
(80, 3, 28, 3, NULL, '2025-08-04 19:39:46'),
(81, 3, 29, NULL, 'bt', '2025-08-04 19:39:46'),
(82, 3, 30, 5, NULL, '2025-08-04 19:39:46'),
(83, 3, 32, 5, NULL, '2025-08-04 19:39:46'),
(84, 3, 31, 5, NULL, '2025-08-04 19:39:46'),
(85, 3, 33, 5, NULL, '2025-08-04 19:39:46'),
(86, 3, 35, 3, NULL, '2025-08-04 19:39:46'),
(87, 3, 36, 5, NULL, '2025-08-04 19:39:46'),
(88, 3, 37, 1, NULL, '2025-08-04 19:39:46'),
(89, 3, 38, 4, NULL, '2025-08-04 19:39:46'),
(90, 3, 39, 5, NULL, '2025-08-04 19:39:46'),
(91, 3, 40, NULL, 'El internet luego se va ', '2025-08-04 19:39:46'),
(92, 3, 41, 5, NULL, '2025-08-04 19:39:46'),
(93, 3, 42, 5, NULL, '2025-08-04 19:39:46'),
(94, 3, 43, 5, NULL, '2025-08-04 19:39:46'),
(95, 3, 44, 3, NULL, '2025-08-04 19:39:46'),
(96, 3, 45, 5, NULL, '2025-08-04 19:39:46'),
(97, 3, 46, NULL, 'Nada, absolutamente nada.\nBueno un poco maltratados por un incidente de inundacion pero creo que se mandarian a arreglar ', '2025-08-04 19:39:46'),
(98, 3, 47, 5, NULL, '2025-08-04 19:39:46'),
(99, 3, 48, 5, NULL, '2025-08-04 19:39:46'),
(100, 3, 49, 5, NULL, '2025-08-04 19:39:46'),
(101, 3, 50, 3, NULL, '2025-08-04 19:39:46'),
(102, 3, 51, 4, NULL, '2025-08-04 19:39:46'),
(103, 3, 52, NULL, 'Muy buenas', '2025-08-04 19:39:46'),
(104, 3, 34, NULL, 'Unas pantallas para ver netflix', '2025-08-04 19:39:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `contraseña` varchar(255) DEFAULT NULL,
  `rol` enum('admin','empleado') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `contraseña`, `rol`) VALUES
(1, 'Diego', 'sistemas@oltech.mx', '$2a$10$exZPgN3GjLb31MGGY5f3DuR5w8M6MhkgIlL1fjqa2iUFVXMOLvkNe', 'admin'),
(2, 'Maricela', 'mreyes@oltech.mx', '$2a$10$exZPgN3GjLb31MGGY5f3DuR5w8M6MhkgIlL1fjqa2iUFVXMOLvkNe', 'empleado'),
(3, 'amelina', 'aherrera@oltech.mx', '$2a$10$6kYVfLVo66m91MU9J7hJn.HRZYnzzYMDje5o6wvzggQqS9RfV7yLu', 'empleado'),
(4, 'Alejandro', 'alex@oltech.mx', '$2a$10$qkxsAgP.APNBskosGuEW3eshkjsB4/Hz2MKmoarf3ZQg2mtAaifOW', 'empleado');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
