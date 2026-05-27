-- ============================================
-- Rafael Pedroso Advocacia - SQL Server Schema
-- ============================================

USE master;
GO

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'RafaelPedrosoAdv')
BEGIN
    CREATE DATABASE RafaelPedrosoAdv;
END
GO

USE RafaelPedrosoAdv;
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Contatos]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Contatos] (
    [Id]                INT IDENTITY(1,1) PRIMARY KEY,
    [Nome]              NVARCHAR(150)  NOT NULL,
    [Email]             NVARCHAR(200)  NOT NULL,
    [Telefone]          NVARCHAR(30)   NULL,
    [Assunto]           NVARCHAR(120)  NOT NULL,
    [Mensagem]          NVARCHAR(MAX)  NOT NULL,
    [AreaDireito]       NVARCHAR(80)   NULL,
    [Modalidade]        NVARCHAR(20)   NULL,
    [ConsentimentoLGPD] BIT            NOT NULL DEFAULT 0,
    [Origem]            NVARCHAR(120)  NULL,
    [Ip]                NVARCHAR(64)   NULL,
    [UserAgent]         NVARCHAR(300)  NULL,
    [Status]            NVARCHAR(20)   NOT NULL DEFAULT 'Novo',
    [CriadoEm]          DATETIME2      NOT NULL DEFAULT SYSUTCDATETIME(),
    [AtualizadoEm]      DATETIME2      NULL
);
END
GO

IF COL_LENGTH('dbo.Contatos', 'Modalidade') IS NULL
    ALTER TABLE [dbo].[Contatos] ADD [Modalidade] NVARCHAR(20) NULL;
GO
IF COL_LENGTH('dbo.Contatos', 'ConsentimentoLGPD') IS NULL
    ALTER TABLE [dbo].[Contatos] ADD [ConsentimentoLGPD] BIT NOT NULL CONSTRAINT DF_Contatos_ConsentimentoLGPD DEFAULT 0;
GO
IF COL_LENGTH('dbo.Contatos', 'Origem') IS NULL
    ALTER TABLE [dbo].[Contatos] ADD [Origem] NVARCHAR(120) NULL;
GO
IF COL_LENGTH('dbo.Contatos', 'Ip') IS NULL
    ALTER TABLE [dbo].[Contatos] ADD [Ip] NVARCHAR(64) NULL;
GO
IF COL_LENGTH('dbo.Contatos', 'UserAgent') IS NULL
    ALTER TABLE [dbo].[Contatos] ADD [UserAgent] NVARCHAR(300) NULL;
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Contatos_Status_CriadoEm' AND object_id = OBJECT_ID('dbo.Contatos'))
    CREATE INDEX [IX_Contatos_Status_CriadoEm] ON [dbo].[Contatos] ([Status], [CriadoEm] DESC);
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Agendamentos]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Agendamentos] (
    [Id]           INT IDENTITY(1,1) PRIMARY KEY,
    [Nome]         NVARCHAR(150)  NOT NULL,
    [Email]        NVARCHAR(200)  NOT NULL,
    [Telefone]     NVARCHAR(30)   NOT NULL,
    [DataHora]     DATETIME2      NOT NULL,
    [Modalidade]   NVARCHAR(20)   NOT NULL DEFAULT 'Online',
    [AreaDireito]  NVARCHAR(80)   NULL,
    [Observacoes]  NVARCHAR(MAX)  NULL,
    [Status]       NVARCHAR(20)   NOT NULL DEFAULT 'Pendente',
    [CriadoEm]     DATETIME2      NOT NULL DEFAULT SYSUTCDATETIME(),
    [AtualizadoEm] DATETIME2      NULL
);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Agendamentos_DataHora' AND object_id = OBJECT_ID('dbo.Agendamentos'))
    CREATE INDEX [IX_Agendamentos_DataHora] ON [dbo].[Agendamentos] ([DataHora] DESC);
GO

-- Mantida apenas para uso interno. A exibicao promocional de depoimentos
-- deve ser avaliada conforme as normas de publicidade da OAB.
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Depoimentos]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Depoimentos] (
    [Id]        INT IDENTITY(1,1) PRIMARY KEY,
    [Nome]      NVARCHAR(150) NOT NULL,
    [Texto]     NVARCHAR(MAX) NOT NULL,
    [Nota]      TINYINT       NOT NULL DEFAULT 5,
    [Ativo]     BIT           NOT NULL DEFAULT 0,
    [CriadoEm]  DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME()
);
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Artigos]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Artigos] (
    [Id]           INT IDENTITY(1,1) PRIMARY KEY,
    [Titulo]       NVARCHAR(250)  NOT NULL,
    [Slug]         NVARCHAR(250)  NOT NULL UNIQUE,
    [Resumo]       NVARCHAR(500)  NULL,
    [Conteudo]     NVARCHAR(MAX)  NOT NULL,
    [Categoria]    NVARCHAR(80)   NULL,
    [ImagemUrl]    NVARCHAR(500)  NULL,
    [Publicado]    BIT            NOT NULL DEFAULT 0,
    [PublicadoEm]  DATETIME2      NULL,
    [CriadoEm]     DATETIME2      NOT NULL DEFAULT SYSUTCDATETIME(),
    [AtualizadoEm] DATETIME2      NULL
);
END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[Artigos])
BEGIN
INSERT INTO [dbo].[Artigos] ([Titulo], [Slug], [Resumo], [Conteudo], [Categoria], [Publicado], [PublicadoEm]) VALUES
('Quais documentos ajudam em uma reclamacao trabalhista?', 'documentos-reclamacao-trabalhista', 'Carteira de trabalho, recibos, mensagens, controles de ponto e outros registros podem ajudar na analise inicial.', 'Conteudo informativo para orientar a organizacao de documentos antes da consulta juridica.', 'Direito do Trabalho', 1, SYSUTCDATETIME()),
('Rescisao indireta: quando o empregado pode encerrar o contrato?', 'rescisao-indireta', 'A rescisao indireta depende de falta grave do empregador e deve ser analisada caso a caso.', 'Conteudo informativo sobre hipoteses legais e cautelas na rescisao indireta.', 'Direito do Trabalho', 1, SYSUTCDATETIME()),
('Empresa: como reduzir riscos trabalhistas?', 'consultoria-trabalhista-empresas', 'Rotinas documentadas, contratos adequados e orientacao preventiva reduzem conflitos e passivos.', 'Conteudo informativo sobre medidas preventivas em relacoes de trabalho.', 'Consultoria Empresarial', 1, SYSUTCDATETIME());
END
GO

PRINT 'Schema atualizado com sucesso.';
GO
