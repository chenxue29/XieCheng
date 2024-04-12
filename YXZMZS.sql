/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80033
 Source Host           : localhost:3306
 Source Schema         : YXZMZS

 Target Server Type    : MySQL
 Target Server Version : 80033
 File Encoding         : 65001

 Date: 12/04/2024 11:16:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for image
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `picture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `travel_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of image
-- ----------------------------
BEGIN;
INSERT INTO `image` (`id`, `picture`, `travel_id`, `user_id`) VALUES (10, 'http://xiechengtravel.oss-cn-shanghai.aliyuncs.com/466dcfd5595295c96c30cc41d3d91737', 109, 1);
INSERT INTO `image` (`id`, `picture`, `travel_id`, `user_id`) VALUES (11, 'http://xiechengtravel.oss-cn-shanghai.aliyuncs.com/9de0db809c0dbdbb8dc25fc5db36a966', 109, 1);
INSERT INTO `image` (`id`, `picture`, `travel_id`, `user_id`) VALUES (12, 'http://xiechengtravel.oss-cn-shanghai.aliyuncs.com/edb8aafb4c842d2318a67d328c4dd409', 110, 1);
INSERT INTO `image` (`id`, `picture`, `travel_id`, `user_id`) VALUES (13, 'http://xiechengtravel.oss-cn-shanghai.aliyuncs.com/a8ead03b9c6c82a455fbf57d050ba677', 110, 1);
INSERT INTO `image` (`id`, `picture`, `travel_id`, `user_id`) VALUES (14, 'http://xiechengtravel.oss-cn-shanghai.aliyuncs.com/fc45541606cecdb024db097bcb3fd73b', 111, 1);
INSERT INTO `image` (`id`, `picture`, `travel_id`, `user_id`) VALUES (15, 'http://xiechengtravel.oss-cn-shanghai.aliyuncs.com/0e4bb2ab31713118b59f27f5e1e3a9f8', 111, 1);
INSERT INTO `image` (`id`, `picture`, `travel_id`, `user_id`) VALUES (18, 'http://xiechengtravel.oss-cn-shanghai.aliyuncs.com/fea7f46d20d5d452e71c8154a0239ea8', 114, 1);
INSERT INTO `image` (`id`, `picture`, `travel_id`, `user_id`) VALUES (19, 'http://xiechengtravel.oss-cn-shanghai.aliyuncs.com/f935c99e7d0c8a5bb4cee68208866ac5', 114, 1);
INSERT INTO `image` (`id`, `picture`, `travel_id`, `user_id`) VALUES (20, 'http://xiechengtravel.oss-cn-shanghai.aliyuncs.com/e427addc1e1c5e328dfe375930247f33', 115, 1);
INSERT INTO `image` (`id`, `picture`, `travel_id`, `user_id`) VALUES (21, 'http://xiechengtravel.oss-cn-shanghai.aliyuncs.com/7ad15bf717edb7d288c7b971c8324854', 115, 1);
INSERT INTO `image` (`id`, `picture`, `travel_id`, `user_id`) VALUES (22, 'http://xiechengtravel.oss-cn-shanghai.aliyuncs.com/9fb34ef419bff847c4329cc2ad30a1a6', 116, 1);
INSERT INTO `image` (`id`, `picture`, `travel_id`, `user_id`) VALUES (23, 'http://xiechengtravel.oss-cn-shanghai.aliyuncs.com/28e49c6e13c20677ea187cc2104ded41', 116, 1);
INSERT INTO `image` (`id`, `picture`, `travel_id`, `user_id`) VALUES (24, 'http://xiechengtravel.oss-cn-shanghai.aliyuncs.com/efb719e0d1395dc958c27df2b867c9fe', 117, 1);
INSERT INTO `image` (`id`, `picture`, `travel_id`, `user_id`) VALUES (25, 'http://xiechengtravel.oss-cn-shanghai.aliyuncs.com/0d0ad98de56d56674b88c2e77eaa2fef', 117, 1);
INSERT INTO `image` (`id`, `picture`, `travel_id`, `user_id`) VALUES (27, 'http://xiechengtravel.oss-cn-shanghai.aliyuncs.com/cf16c454a2f9b48d6401700ce3aa4ec6', 119, 1);
INSERT INTO `image` (`id`, `picture`, `travel_id`, `user_id`) VALUES (33, 'http://xiechengtravel.oss-cn-shanghai.aliyuncs.com/2dcb3abf99812371dc60df5361a58561', 125, 1);
COMMIT;

-- ----------------------------
-- Table structure for travel
-- ----------------------------
DROP TABLE IF EXISTS `travel`;
CREATE TABLE `travel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '是否审核：0，1，-1',
  `open` int DEFAULT NULL COMMENT '是否公开：0,1',
  `deleteOr` int DEFAULT NULL COMMENT '是否被管理员删除:0,1',
  `position` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of travel
-- ----------------------------
BEGIN;
INSERT INTO `travel` (`id`, `title`, `content`, `date`, `state`, `open`, `deleteOr`, `position`, `user_id`) VALUES (109, '开心测试', '哦吼吼 这是一条私密内容哦～', '2024年4月11日', '1', 0, 0, '上海市 徐汇区', 1);
INSERT INTO `travel` (`id`, `title`, `content`, `date`, `state`, `open`, `deleteOr`, `position`, `user_id`) VALUES (110, '这回是待审核的测试数据', '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈 我还没刷牙', '2024年4月11日', '1', 1, 0, '上海市 徐汇区', 1);
INSERT INTO `travel` (`id`, `title`, `content`, `date`, `state`, `open`, `deleteOr`, `position`, `user_id`) VALUES (111, '被拒绝的游记', '大脑空空 要不怎么着', '2024年4月11日', '拒绝大脑空空', 1, 0, '上海市 徐汇区', 1);
INSERT INTO `travel` (`id`, `title`, `content`, `date`, `state`, `open`, `deleteOr`, `position`, `user_id`) VALUES (114, 'Dhhdhdhdh', 'Ddhhdhdu', '2024年4月11日', '0', 1, 0, '上海市 徐汇区', 1);
INSERT INTO `travel` (`id`, `title`, `content`, `date`, `state`, `open`, `deleteOr`, `position`, `user_id`) VALUES (115, '终极测试-1', '得好好的活的还想继续进行经济学家先进的', '2024年4月11日', '0', 1, 0, '上海市 徐汇区', 1);
INSERT INTO `travel` (`id`, `title`, `content`, `date`, `state`, `open`, `deleteOr`, `position`, `user_id`) VALUES (116, '又来测试了', '啊啊啊啊啊啊啊啊啊', '2024年4月11日', '0', 1, 0, '上海市 徐汇区', 1);
INSERT INTO `travel` (`id`, `title`, `content`, `date`, `state`, `open`, `deleteOr`, `position`, `user_id`) VALUES (117, '万能的状态管理！', '吼吼吼吼哈哈😆……哈哈一也就是一个ｕuu', '2024年4月11日', '1', 1, 0, '上海市 徐汇区', 1);
INSERT INTO `travel` (`id`, `title`, `content`, `date`, `state`, `open`, `deleteOr`, `position`, `user_id`) VALUES (119, '测测猜测hdudud', '对嘟嘟和好的混合液来说都', '2024年4月11日', '1', 1, 0, '上海市 徐汇区', 1);
INSERT INTO `travel` (`id`, `title`, `content`, `date`, `state`, `open`, `deleteOr`, `position`, `user_id`) VALUES (125, '明天又是新的一天', '明天又是新的一天', '2024年4月12日', '0', 1, 0, ' ', 1);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`id`, `username`, `password`, `profile`) VALUES (1, 'cx', '123456', 'http://xiechengtravel.oss-cn-shanghai.aliyuncs.com/9779a4873b4534531334a4191630cf9a');
INSERT INTO `user` (`id`, `username`, `password`, `profile`) VALUES (2, 'zjj', '123456', NULL);
INSERT INTO `user` (`id`, `username`, `password`, `profile`) VALUES (3, '周佳佳', '654', NULL);
INSERT INTO `user` (`id`, `username`, `password`, `profile`) VALUES (4, '新体育', 'sghd', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
