
-- +migrate Up
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW(); -- Set the updated_at column to the current timestamp
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TABLE IF NOT EXISTS  communication_streams (    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    active BOOLEAN,
    responsible_person VARCHAR(255));

CREATE TABLE IF NOT EXISTS use_case_cluster (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255),
    parent_id UUID,
    description VARCHAR(255),
    active BOOLEAN,
    CONSTRAINT FK_processes foreign key (parent_id) references use_case_cluster (id)
);

CREATE TABLE IF NOT EXISTS systems(
	id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	name VARCHAR(255),
	parent_id UUID,
	category VARCHAR(100),
	tool_name VARCHAR(50),
	description TEXT,
	active BOOLEAN,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	CONSTRAINT FK_system foreign key (parent_id) references systems (id)
);

CREATE TABLE  IF NOT EXISTS  service_lines (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255),
    parent_id UUID,
    description VARCHAR(255),
    active BOOLEAN,
    responsible_person VARCHAR(255),
    CONSTRAINT FK_processes foreign key (parent_id) references service_lines (id)
);

CREATE TABLE IF NOT EXISTS  risks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255),
    parent_id UUID,
    priority integer,
    description VARCHAR(255),
    active BOOLEAN,
    CONSTRAINT FK_processes foreign key (parent_id) references risks (id)
);


CREATE TABLE IF NOT EXISTS processes(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255),
    parent_id UUID,
    type VARCHAR(255),
    focus_field BOOLEAN,
    active BOOLEAN,
    CONSTRAINT PROCESSES_TYPE CHECK (type IN ('RUBBER' , 'METAL' , 'PLASTIC' , 'ASSEMBLY')),
    CONSTRAINT FK_processes foreign key (parent_id) references processes (id)
);

CREATE TABLE IF NOT EXISTS  plants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255),
    parent_id UUID,
    operations_cluster VARCHAR(255),
    type VARCHAR(255),
    name_abbreviation VARCHAR(255),
    segment VARCHAR(255),
    zebra VARCHAR(255),
    active BOOLEAN,
    CONSTRAINT PLANTS_TYPE CHECK (type IN ('PLANT' , 'BUSINESS AREA')),
    CONSTRAINT PLANTS_SEGMENT CHECK (segment IN ('TS' , 'DTS','ERS' , 'AVS','PSS')),
    CONSTRAINT FK_processes foreign key (parent_id) references plants (id)
);

CREATE TABLE IF NOT EXISTS  machines (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255),
    parent_id UUID,
    priority integer,
    description VARCHAR(255),
    status VARCHAR(255),
    active BOOLEAN,
    CONSTRAINT MACHINES_STATUS CHECK (status IN ('NOT STARTED' , 'STARTED', 'FINISHED')),
    CONSTRAINT FK_processes foreign key (parent_id) references machines (id)
);

CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON communication_streams
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON use_case_cluster
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON systems
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON service_lines
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON risks
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON processes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON plants
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON machine
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
-- +migrate Down
