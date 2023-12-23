
-- +migrate Up
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS communication_streams (    
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    active BOOLEAN NOT NULL,
    responsible_person VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS use_case_cluster (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id UUID,
    description VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT FK_use_case_cluster foreign key (parent_id) references use_case_cluster (id)
);

CREATE TABLE IF NOT EXISTS systems(
	id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	parent_id UUID,
	category VARCHAR(100) NOT NULL,
	tool_name VARCHAR(50) NOT NULL,
	description TEXT NOT NULL,
	active BOOLEAN NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	CONSTRAINT FK_systems foreign key (parent_id) references systems (id)
);

CREATE TABLE  IF NOT EXISTS service_lines (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id UUID,
    description VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL,
    responsible_person VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT FK_service_lines foreign key (parent_id) references service_lines (id)
);

CREATE TABLE IF NOT EXISTS risks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id UUID,
    priority integer NOT NULL,
    description VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT FK_risks foreign key (parent_id) references risks (id)
);


CREATE TABLE IF NOT EXISTS processes(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id UUID,
    type VARCHAR(255) NOT NULL,
    focus_field BOOLEAN,
    active BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT PROCESSES_TYPE CHECK (type IN ('RUBBER' , 'METAL' , 'PLASTIC' , 'ASSEMBLY')),
    CONSTRAINT FK_processes foreign key (parent_id) references processes (id)
);

CREATE TABLE IF NOT EXISTS  plants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id UUID,
    operations_cluster VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    name_abbreviation VARCHAR(255) NOT NULL,
    segment TEXT[],
    zebra BOOLEAN,
    active BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT PLANTS_TYPE CHECK (type IN ('PLANT' , 'BUSINESS AREA')),
    CONSTRAINT SEGMENT CHECK(segment <@ ARRAY['TS', 'DTS','ERS' , 'AVS','PSS','']),
    CONSTRAINT FK_plants foreign key (parent_id) references plants (id)
);

CREATE TABLE IF NOT EXISTS machines (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id UUID,
    priority integer,
    description VARCHAR(255),
    status VARCHAR(255),
    active BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT MACHINES_STATUS CHECK (status IN ('NOT STARTED', 'STARTED', 'FINISHED','')),
    CONSTRAINT FK_machines foreign key (parent_id) references machines (id)
);

-- +migrate StatementBegin


-- +migrate StatementEnd

-- +migrate Down