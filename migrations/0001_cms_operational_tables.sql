create table if not exists contact_submissions (
  id text primary key,
  name text not null,
  phone text not null,
  email text,
  address text not null,
  service text not null,
  preferred_date text,
  message text,
  status text not null default 'new',
  ip_address text,
  user_agent text,
  created_at text not null
);

create index if not exists idx_contact_submissions_created_at
  on contact_submissions (created_at desc);

create table if not exists job_applications (
  id text primary key,
  name text not null,
  email text not null,
  phone text not null,
  role text not null,
  message text,
  cv_key text,
  status text not null default 'new',
  ip_address text,
  user_agent text,
  created_at text not null
);

create index if not exists idx_job_applications_created_at
  on job_applications (created_at desc);

create table if not exists audit_events (
  id text primary key,
  actor text,
  action text not null,
  target_type text,
  target_id text,
  metadata text,
  created_at text not null default (datetime('now'))
);

create table if not exists rate_limit_events (
  id text primary key,
  route text not null,
  ip_address text not null,
  created_at text not null default (datetime('now'))
);

create index if not exists idx_rate_limit_events_route_ip_created_at
  on rate_limit_events (route, ip_address, created_at desc);
