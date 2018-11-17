--
-- PostgreSQL database dump
--

-- Dumped from database version 11.1
-- Dumped by pg_dump version 11.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: companies; Type: TABLE; Schema: public; Owner: devjoblist
--

CREATE TABLE public.companies (
    id integer NOT NULL
);


ALTER TABLE public.companies OWNER TO devjoblist;

--
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: devjoblist
--

CREATE SEQUENCE public.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.companies_id_seq OWNER TO devjoblist;

--
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devjoblist
--

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;


--
-- Name: jobs; Type: TABLE; Schema: public; Owner: devjoblist
--

CREATE TABLE public.jobs (
    id integer NOT NULL
);


ALTER TABLE public.jobs OWNER TO devjoblist;

--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: devjoblist
--

CREATE SEQUENCE public.jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jobs_id_seq OWNER TO devjoblist;

--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devjoblist
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- Name: companies id; Type: DEFAULT; Schema: public; Owner: devjoblist
--

ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: devjoblist
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: devjoblist
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: devjoblist
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--
