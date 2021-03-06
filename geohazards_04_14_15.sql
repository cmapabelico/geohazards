PGDMP     /    %                s         
   geohazards    9.3.6    9.3.6     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �           1262    17802 
   geohazards    DATABASE     |   CREATE DATABASE geohazards WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_PH.UTF-8' LC_CTYPE = 'en_PH.UTF-8';
    DROP DATABASE geohazards;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    5            �           0    0    public    ACL     �   REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;
                  postgres    false    5            �            3079    11787    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            �           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    172            �            1259    17822    hazard_data    TABLE       CREATE TABLE hazard_data (
    hazard_id integer DEFAULT 1 NOT NULL,
    flashflood_data text,
    coastal_data text,
    urban_data text,
    fluvial_data text,
    pluvial_data text,
    landslide_data text,
    fault_data text,
    volcanic_data text,
    tsunami_data text
);
    DROP TABLE public.hazard_data;
       public         postgres    false    5            �            1259    17806    user    TABLE     q   CREATE TABLE "user" (
    user_id character varying(50)[] NOT NULL,
    user_password character varying(50)[]
);
    DROP TABLE public."user";
       public         postgres    false    5            �          0    17822    hazard_data 
   TABLE DATA               �   COPY hazard_data (hazard_id, flashflood_data, coastal_data, urban_data, fluvial_data, pluvial_data, landslide_data, fault_data, volcanic_data, tsunami_data) FROM stdin;
    public       postgres    false    171   ]       �          0    17806    user 
   TABLE DATA               1   COPY "user" (user_id, user_password) FROM stdin;
    public       postgres    false    170           K           2606    17830 	   hazard_id 
   CONSTRAINT     S   ALTER TABLE ONLY hazard_data
    ADD CONSTRAINT hazard_id PRIMARY KEY (hazard_id);
 ?   ALTER TABLE ONLY public.hazard_data DROP CONSTRAINT hazard_id;
       public         postgres    false    171    171            I           2606    17813    user_id 
   CONSTRAINT     J   ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_id PRIMARY KEY (user_id);
 8   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_id;
       public         postgres    false    170    170            �   �  x��Z;o�G��_����]�R�O\6pDAf
����)�!�g��R#R�F��ٙ�O���;~~����~ܿ;������������������{���s�����i�||����r��m�}|��W}�����}8<xx|w<�-1OaOj>�ǽ���I�bc��//��9�����-'�sg���8N�r:�7v�޺d����N���N'2�UF�&��4B�۫�v���??<�������?�3b��*ǽ,U�֨;�Y�$s���ۊ�tS�MJN'���Xp��qC�tj��:�ltB[xӚ�!_$]t�	��AC�Ӛ`6Gm���d�n�I�˷/7c[��(�5W	s�6�NE�b�ds�S�}�{���F���C�$ǠYTp�tWw����V����P�g:`p�D��A�`0� �_�ZM�_�.�)�;h���j��38���yԜ#�ڀ�X��		.J�!���z���)�x9H%#%K�-�s�]�A�p���q%p�dF	8�7	�Ska`�ʝ$�$_/i����TzQT�y�<t�^%�ּ���	E���m���p[:h�I�-��S3�V��A�'HpH��4�}D�oβ&�ۿq~_Y�h�$�<���%A&�w���M`3s��,�Z[8�j�	;g��kɂ�S]�]p:M���ܹB��wH�
\kIf*g8=�Jh��1��9�a?�:��y��79ּƴ!������8���A�j�����^u8!0�hg�*k�PRe[88]�j��ݧc0�Xt˽������'���+�p>�BPP\cm�p=`m;&Y�)�:�L�_2���zY��YRސ���$��K�#�M�D�o��B��K:t��1Z�2�;�g��m����}%�A�/�~@m�\b����K\f�Y0�Np]���e�T��h8�
fD&�XIw���u	q�Q��
3��~���pb	�g�fk��%�&G���믻.�Lj�\�N_o|��J���0�������w��D����4 =1�jV��)�Tm�eP�f-I/w���s�^��m�E����J���5�p(	����3\@t���e��psR��	Ƀ�W�%���;���mY��zQ#�_�#O�:�
gT��������y��ܼM?V���F"a���_I�:����0�<�Zg	��
�ʻ
��n�TT���:�#%�����|"����Iͅ:��υ)0� V�Qs%�	�.쬾�J���j
�\�}=s�[ޚ\�+h�J	�"%a��T���ἆ>hn��پ�Hk��x,gE�2��,�R�����v�LH`H͍t�ɂ�m������0�%By�ׁA�Z�Y����G�sW,���fm�F;���-gi���PC�+ih� 4����1��%� ����i�XO2�}�������<�1      �      x���ML��6426������ 6��     